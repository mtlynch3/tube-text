//study sessions table
const Sequelize = require('sequelize');
const db = require('../configDB/database');

const StudySession = db.define("studySession", {

	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},

	videoUrl: {
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