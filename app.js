const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'library.db'
});

class Book extends Sequelize.model {}
Book.init({
  title: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        msg: 'Title field is required'
      }
    }
  },
  author: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        msg: 'Author field is required'
      }
    }
  },
  genre: Sequelize.STRING,
  year: Sequelize.INTEGER
}, { sequelize });

// async IIFE
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database successful!');
  } catch (error) {
    console.error('Error connecting to the database: ', error);
  }
})();