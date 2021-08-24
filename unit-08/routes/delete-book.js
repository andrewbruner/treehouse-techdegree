module.exports = (app, asyncHandler, Book) => {

  // Post Delete Book
  app.post('/books/:id/delete', asyncHandler(async (req, res) => {
    // Delete Book (irreversible)
    Book.destroy({
      where: {
        id: req.params.id
      }
    });
    // Redirect to Homepage
    res.redirect('/books');
  }));
};