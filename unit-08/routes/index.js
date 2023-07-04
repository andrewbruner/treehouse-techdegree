module.exports = (app, db, Book) => {

  // Helper Function
  const asyncHandler = cb => (
    async (req, res, next) => {
      try {
        await cb(req, res, next);
      } catch (err) {
        console.error(err);
        res.status(500).render('error');
      }
    }
  );

  // Get Homepage (redirect to Get All Books)
  app.get('/', asyncHandler(async (req, res) => {
    res.redirect('/books');
  }));

  const books = require('./books')(app, asyncHandler, db, Book);

  const newBook = require('./new-book')(app, asyncHandler, Book);

  const bookDetail = require('./book-detail')(app, asyncHandler, Book);

  const deleteBook = require('./delete-book.js')(app, asyncHandler, Book);

  // 404 Not Found
  app.use( asyncHandler(async (req, res) => {
    res.status(404).render('page-not-found')
  }));

  // Error Handler
  app.use( (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error');
  });

};