//users table
const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../configDB/database');

const User = db.define("user", {

	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},

	username: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false
	},

	password: {
		type: Sequelize.STRING,
		allowNull: false,
		get(){
			return () => this.getDataValue("password");
		}
	},

	salt: {
		type: Sequelize.STRING,
		get() {
			return () => this.getDataValue("salt");
		}
	}
});

User.generateSalt = function() {
	return crypto.randomBytes(16).toString("base64");
};

User.encryptPassword = function(plainText, salt){
	return crypto
		.createHash("RSA-SHA256")
		.update(plainText)
		.update(salt)
		.digest("hex");
};

User.prototype.correctPassword = function(passwordAttempt) {
	return User.encryptPassword(passwordAttempt, this.salt()) === this.password();

};

const setSaltAndPassword = user => {
	if (user.changed("password")) {
		user.salt = User.generateSalt();
		user.password = User.encryptPassword(user.password(), user.salt());
	}
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);

module.exports = User;