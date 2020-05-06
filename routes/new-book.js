module.exports = (app, asyncHandler, Book) => {
  
  // Get New Book
  app.get('/books/new', asyncHandler(async (req, res) => {
    // Show 'Create New Book' Form
    res.render('new-book', { title: 'New Book' });
  }));

  // Post New Book
  app.post('/books/new', asyncHandler(async (req, res) => {
    try {
      // Post New Book to Database
      const book = await Book.create(req.body);
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
        // Finally, render the new-book template with error local
        res.render('new-book', { error })
      )
      // No: log error and render error template
      : (
        console.error(err),
        res.status(500).render('error')
      );
    }
  }));
};