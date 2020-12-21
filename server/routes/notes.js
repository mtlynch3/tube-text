//notes controller: /api/notes/
const express = require('express');
const router = express.Router();
const { User, StudySession, Note } = require('../models');

//so we don't have to use try-catch for each request handler
const ash = require('express-async-handler');


// get all notes from table
// SELECT * from notes;
router.get('/', ash(async(req, res) => {
    let notes = await Note.findAll();
    res.status(200).json(notes);
}));


// get all notes (given study session)
// SELECT * FROM notes WHERE "studySessionId" = :id;
router.get('/studysessions/:id', ash(async(req, res) => {
    let notes = await Note.findAll({ 
		include: [StudySession], 
		where: {
			studySessionId: req.params.id
		}
    });
    res.status(200).json(notes);
}));



module.exports = router;