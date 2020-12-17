const User = require('./User');
const StudySession = require('./StudySession');
const Note = require('./Note');

//establish relations between objects

Note.belongsTo(StudySession);
StudySession.hasMany(Note);

StudySession.belongsTo(User);
User.hasMany(StudySession);


module.exports = {
	User,
	StudySession,
	Note
};