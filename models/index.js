const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  {
    dialect: 'sqlite',
    storage: 'fsjstd-restapi.db',
    logging: false
  }
);

const db = {
  sequelize,
  Sequelize,
  models: { },
};

db.models.User = require('./user.js')(sequelize);
db.models.Course = require('./course.js')(sequelize);

Object.keys(db.models).forEach(modelName => {
    if (db.models[modelName].associate) {
        db.models[modelName].associate(db.models);
    }
});

module.exports = db;
