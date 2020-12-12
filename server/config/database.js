const Sequelize = require('sequelize');

module.exports = new Sequelize('tubetext', 'melissalynch', 'mlynch', {
  host: 'localhost',
  dialect: 'postgres'
});