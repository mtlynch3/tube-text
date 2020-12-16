const Sequelize = require('sequelize');
const dbName = require('./dbName');

const db = new Sequelize(dbName, 'melissalynch', 'mlynch', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = db;