//notes table
const Sequelize = require('sequelize');
const db = require('../configDB/database');

const Note = db.define("note", {

    id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
    },
    
    timestamp: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },

    content: {
        type: Sequelize.TEXT
    }
    
});

module.exports = Note;