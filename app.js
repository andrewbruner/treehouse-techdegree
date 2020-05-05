/* ---------- EXPRESS ---------- */

// Include Express Module
const express = require('express');

// Create Express Application
const app = express();


/* ---------- CONFIGURATION ---------- */

// Template Engine Configuration
app.set('view engine', 'pug');

// Static Files Hosting Configuration
app.use('/static', express.static('public'));

// Enable Access to Request Body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


/* ---------- DATABASE ---------- */

const db = require('./models');
const { Book } = db.models;


/* ---------- ROUTES ---------- */

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

// 404 Not Found
app.use( asyncHandler(async (req, res) => {
  res.status(404).render('page-not-found')
}));

// Error Handler
app.use( (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error');
});


/* ---------- INITIALIZATION IIFE ---------- */
(async () => {

  // Test Database Connection
  try {
    await db.sequelize.authenticate();
    console.log('Database connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database: ', error);
  }

  // Force-Sync All Database Models
  try {
    await db.sequelize.sync({ force: false });
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Unable to synchronize the database: ', error);
  }

  // Initialize Server
  try {
    app.listen(3000, () => console.log('Server listening on port 3000...'));
  } catch (error) {
    console.error('Server connection error: ', error);
  }
})();