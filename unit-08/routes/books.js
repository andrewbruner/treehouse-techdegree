module.exports = (app, asyncHandler, db, Book) => {

  // Get All Books
  app.get('/books(:page)?', asyncHandler(async (req, res, next) => {
    if (req.params.page && !/\d/.test(req.params.page)) {return next()}
    // Find All Books in Database
    const books = await Book.findAll();
    // Find Requested Page for Results
    let page = '1';
    if (req.params.page) {
      page = req.params.page;
    }
    // Show Requested Page of Full List of Books
    res.render('index', { title: 'Books', books, page });
  }));

  // Post All Books (Search Form)
  app.post('/books', asyncHandler(async (req, res) => {
    const searchTerm = req.body.search;
    const { Op } = db.Sequelize;
    const books = await Book.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.substring]: searchTerm } },
          { author: { [Op.substring]: searchTerm } },
          { genre: { [Op.substring]: searchTerm } },
          { year: { [Op.substring]: searchTerm } },
        ]
      }
    });
    res.render('index', { title: 'Search Results', books: books, searchTerm });
  }));
};