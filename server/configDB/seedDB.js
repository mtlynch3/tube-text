const { User, StudySession, Note } = require('../models');

const seedDatabase = async () => {
	const tt = await User.create({
		username: "tubetext",
		password: "1234",
		email: "admin@tubetext.com"
	});

	const dummy_sess = await StudySession.create({
			videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
			name: "Session 1",
			description: "Calculus 1"
		});

	const dummy_note = await Note.create({
			timestamp: 69.420,
			content: "I don't care"
		});

	await dummy_sess.setUser(tt);
	await dummy_note.setStudySession(dummy_sess);
	
}

module.exports = seedDatabase;