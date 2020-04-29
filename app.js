// Include Express Module
const express = require('express');
// Create Express Application
const app = express();

// Include Sequelize Module
const Sequelize = require('sequelize');
// Set Up Database Connection
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'library.db'
});

// Routes
app.get('/', async (req, res) => {});
app.get('/books', async (req, res) => {});
app.get('/books/new', async (req, res) => {});
app.post('/books/new', async (req, res) => {});
app.get('/books/:id', async (req, res) => {});
app.post('/books/:id', async (req, res) => {});
app.post('/books/:id/delete', async (req, res) => {});

// Initialization IIFE
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