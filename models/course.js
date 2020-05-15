const Sequelize = require('sequelize');

module.exports = sequelize => {
  
  class Course extends Sequelize.Model {};
  
  Course.init(
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
	validate: {
	  notNull: {
	    msg: 'Please enter a valid title.'
	  },
	  notEmpty: {
	    msg: 'Please enter a valid title.'
	  }
	}
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
	validate: {
	  notNull: {
	    msg: 'Please enter a valid description.'
	  },
	  notEmpty: {
	    msg: 'Please enter a valid description.'
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

  Course.associate = models => {
    Course.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Course;
};
