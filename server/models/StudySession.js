//study sessions table
const Sequelize = require('sequelize');
const db = require('../config/database');

const StudySession = db.define("studySession", {

	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},

	videoURL: {
		type: Sequelize.STRING,
		allowNull: false
	},

    name: {
        type: Sequelize.STRING,
	},
	
	description: {
		type: Sequelize.STRING
	}

});

module.exports = StudySession;