/* ---------- EXPRESS ---------- */

// Include Express Module
const express = require('express');

// Create Express Application
const app = express();


/* ---------- PUG TEMPLATING / STATIC FILES SETUP ---------- */
app.set('view engine', 'pug');
app.use('/static', express.static('public'));


/* ---------- SEQUELIZE ---------- */

// Include Sequelize Module
const Sequelize = require('sequelize');

// Set Up Database Connection
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'library.db'
});

const Book = require('./models/book');

/* ---------- ROUTES ---------- */

// Helper Function
const asyncHandler = cb => (
  async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

// Get Homepage (redirect to Get All Books)
app.get('/', async (req, res) => {
  res.redirect('/books');
});

// Get All Books
app.get('/books', (req, res) => {
  res.render('index', {
    pageTitle: 'Books',
    books: [
      { title: 'East of Eden', author: 'John Steinbeck', genre: 'fiction' },
      { title: 'Moby-Dick', author: 'Herman Melville', genre: 'fiction', year: 1851 }
    ]
  });
  // Show full list of books
});

// Get New Book
app.get('/books/new', (req, res) => {
  res.send('GET New Book');
  // Show 'create new book' form
});

// Post New Book
app.post('/books/new', (req, res) => {
  // Post new book to database
});

// Get Book Detail
app.get('/books/:id', (req, res) => {
  res.send('GET Book Detail');
  // Show 'book detail' form
});

// Post Book Detail
app.post('/books/:id', (req, res) => {
  // Update book info in database
});

// Post Delete Book
app.post('/books/:id/delete', (req, res) => {
  // Delete book (irreversible)
});

// 404 Not Found
app.use( (req, res) => {
  res.status(404).send('404 Not Found')
  // { Render 404 message }
});

// Error Handler
app.use( (err, req, res, next) => {
  console.error(err.stack);
  res/*.status(500)*/.send('Something broke!');
  // { Render error message }
});


/* ---------- INITIALIZATION IIFE ---------- */
(async () => {

  // Test Database Connection
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database: ', error);
  }

  // Force-Sync All Database Models
  try {
    await sequelize.sync({ force: true });
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