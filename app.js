const express = requre('express');
const app = express();

const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'library.db'
});



// async IIFE
(async () => {
  // Force sync all models
  await sequelize.sync({ force: true })

  try {

  } catch (error) {
    console.error('Error connecting to the database: ', error);
  }
})();



app.listen(3000, () => console.log('Server listening on port 3000...'));