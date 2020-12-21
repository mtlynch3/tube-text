//notes controller: /api/notes/
const express = require('express');
const router = express.Router();
const { User, StudySession, Note } = require('../models');

//so we don't have to use try-catch for each request handler
const ash = require('express-async-handler');

/******************* GET *******************/

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


//	get a single note by its id
router.get('/:id', ash(async(req, res) => {
    let note = await Note.findByPk(req.params.id);
    res.status(200).json(note);
}));

/******************* POST *******************/
    // expect body as payload from post request 
    // from front end (in the thunk the axios post call 
    // will have two arguments: 1. is the endpoint 
    // to hit and 2. is the payload to send (payload 
    // to send is whatever form being used to make a new note))
    //
    // sends back 201 response and also sends newNote 
    // (find this in the data key in the response object - 
    // response.data) to redux store for action.payload

router.post('/add', ash(async(req, res) => { 
    let newNote = await Note.create(req.body);
    res.status(201).json(newNote);
}));

/******************* DELETE  *********************/

router.delete('/delete/:id', ash(async(req, res) => {
    await Note.destroy({where: {id: req.params.id}});
    res.sendStatus(204);
}));

/******************* EDIT *********************/

router.put('/edit/:id', ash(async(req, res) => {
    await Note.update(
        {content: req.body.content},
        {where: {id: req.params.id}}
    );
    res.sendStatus(201);
}));



module.exports = router;