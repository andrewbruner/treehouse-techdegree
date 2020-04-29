/* ---------- EXPRESS ---------- */

// Include Express Module
const express = require('express');

// Create Express Application
const app = express();


/* ---------- PUG TEMPLATING SETUP ---------- */
app.set('view enging', 'pug');
app.use(express.static('public'));


/* ---------- SEQUELIZE ---------- */

// Include Sequelize Module
const Sequelize = require('sequelize');

// Set Up Database Connection
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'library.db'
});


/* ---------- ROUTES ---------- */

// Get Homepage (redirect to Get All Books)
app.get('/', async (req, res) => {
  res.redirect('/books');
});

// Get All Books
app.get('/books', async (req, res) => {
  // Show full list of books
});

// Get New Book
app.get('/books/new', async (req, res) => {
  // Show 'create new book' form
});

// Post New Book
app.post('/books/new', async (req, res) => {
  // Post new book to database
});

// Get Book Detail
app.get('/books/:id', async (req, res) => {
  // Show 'book detail' form
});

// Post Book Detail
app.post('/books/:id', async (req, res) => {
  // Update book info in database
});

// Post Delete Book
app.post('/books/:id/delete', async (req, res) => {
  // Delete book (irreversible)
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