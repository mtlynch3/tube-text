const Sequelize = require('sequelize');
const dbName = require('./dbName');

const db = new Sequelize(dbName, 'postgres', 'pgpwd', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = db;