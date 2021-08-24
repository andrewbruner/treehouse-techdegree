const Sequelize = require('sequelize');

module.exports = sequelize => {
  
  class User extends Sequelize.Model {};
  
  User.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
	        msg: 'Please enter a valid first name.',
	      },
        notEmpty: {
          msg: 'Please enter a valid first name.',
	      },
      },
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
	        msg: 'Please enter a valid last name.',
	      },
        notEmpty: {
          msg: 'Please enter a valid last name.',
	      },
      },
    },
    emailAddress: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
	        msg: 'Please enter a valid email address.',
	      },
        notEmpty: {
          msg: 'Please enter a valid email address.',
	      },
	      isEmail: {
	        msg: 'Email address must be a valid format.',
	      },
	      isUnique: async email => {
	        const matchingUser = await User.findOne({ attributes: ['emailAddress'], where: { emailAddress: email } });
          if (matchingUser) {
	          throw new Error(`Sorry, email address ${matchingUser.emailAddress} is already in use.`);
	        }
	      },
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
	        msg: 'Please enter a valid password.',
	      },
	      notEmpty: {
          msg: 'Please enter a valid password.',
	      },
      },
    },
  }, { sequelize, modelName: 'user' });

  User.associate = models => {
    User.hasMany(models.Course, { foreignKey: 'userId' });
  };

  return User;
};