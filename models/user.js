const Sequelize = require('sequelize');

module.exports = sequelize => {
  
  class User extends Sequelize.Model {};
  
  User.init(
    {
      firstName: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: 'First name is required'
          }
        }
      },
      lastName: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: 'Last name is required'
          }
        }
      },
      emailAddress: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: 'Email address is required'
          }
        }
      },
      password: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: 'Password is required'
          }
        }
      }
    },
    {
      sequelize
    }
  );

  return User;
};