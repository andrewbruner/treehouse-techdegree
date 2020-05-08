const Sequelize = require('sequelize');

module.exports = sequelize => {
  
  class Course extends Sequelize.Model {};
  
  Course.init(
    {
      userId: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: 'Title is required'
          }
        }
      },
      description: {
        type: Sequelize.TEXT,
        validate: {
          notEmpty: {
            msg: 'Description is required'
          }
        }
      },
      estimatedTime: {
        type: Sequelize.STRING
      },
      materialsNeeded: {
        type: Sequelize.STRING
      }
    },
    {
      sequelize
    }
  );

  return Course;
};