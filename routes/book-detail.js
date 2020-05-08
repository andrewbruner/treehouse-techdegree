module.exports = (app, asyncHandler, Book) => {

  // Get Book Detail
  app.get('/books/:id', asyncHandler(async (req, res, next) => {
    // Find Book in Database by Primary Key/Route Parameter
    const book = await Book.findByPk(req.params.id);
    // If the Book ID Exists in Database...
    book
      // Show 'Book Detail' Form
      ? res.render('update-book', { title: book.title, book })
      // Else Throw Error
      : next(Error('Book ID does not exist in database'));
  }));

  // Post Book Detail
  app.post('/books/:id', asyncHandler(async (req, res) => {
    try {
      // Update book info in database
      await Book.update({
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        year: req.body.year
      },{
        where: {
          id: req.params.id
        }
      });
      // Redirect to Homepage
      res.redirect('/books');
    } catch (err) {
      let error = { };
      // Is the error a validation error?
      err.name === 'SequelizeValidationError'
      // Yes...
      ? (
        // Is there more than one error?
        err.errors.length > 1
        // Yes: Error locals is both
        ? error = { title: true, author: true }
        // No...
        : (
          // Is the error a title error?
          err.errors[0].path === 'title'
          // Yes: Error locals is title
          ? error = { title: true }
          // No: Error locals is author
          : error = { author: true }
        ),
        // Finally, render the update-book template with error local
        res.render('update-book', { title: req.body.title, error, book: req.body })
      )
      // No: log error and render error template
      : (
        console.error(err),
        res.status(500).render('error')
      );
    }
  }));
};