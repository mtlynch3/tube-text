//users table
const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define("user", {

	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},

	username: {
		type: Sequelize.STRING,
		allowNull: false
	},

	password: {
		type: Sequelize.TEXT,
		allowNull: false,
	},

	email: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
			isEmail: true
		}
	},

});

module.exports = User;