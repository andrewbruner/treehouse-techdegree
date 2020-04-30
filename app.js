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
app.get('/books', asyncHandler(async (req, res) => {
  // Find All Books in Database
  const books = await Book.findAll();
  // Show Full List of Books
  res.render('index', { title: 'Books', books: books });
}));

// Get New Book
app.get('/books/new', asyncHandler(async (req, res) => {
  // Show 'Create New Book' Form
  res.render('new-book');
}));

// Post New Book
app.post('/books/new', asyncHandler(async (req, res) => {
  // Post New Book to Database
  const book = await Book.create(req.body);
  // Redirect to Homepage
  res.redirect('/books');
}));

// Get Book Detail
app.get('/books/:id', asyncHandler(async (req, res) => {
  // Show 'Book Detail' Form
  res.render('update-book');
}));

// Post Book Detail
app.post('/books/:id', asyncHandler(async (req, res) => {
  // Update book info in database

  // Redirect to Homepage
  res.redirect('/books');
}));

// Post Delete Book
app.post('/books/:id/delete', asyncHandler(async (req, res) => {
  // Delete Book (irreversible)

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