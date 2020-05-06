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
  }));
};