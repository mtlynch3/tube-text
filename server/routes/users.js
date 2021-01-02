const express = require('express');
const router = express.Router();
const { User, StudySession, Note } = require("../models");

//so we don't have to use try-catch for each request handler
//automatically catches errors and passes it to middleware using next()
const ash = require('express-async-handler');

/******************* GET *******************/

router.get('/', ash(async(req, res) => {
    let users = await User.findAll();
    res.status(200).json(users);
}));

router.get('/:id', ash(async(req, res) => {
    let user = await User.findByPk(req.params.id);
    res.status(200).json(user);
}));

//	Gets all users and all of their respective sessions
router.get('/studysessions', ash(async(req, res) => {
    let usersAndSessions = await User.findAll({ include: [StudySession]});
    res.json(usersAndSessions);
}));

//	Gets all users and all of their respective sessions and all of their respective notes
router.get('/studysessions/notes', ash(async(req, res) => {
    let sessionsAndNotes = await User.findAll({ include: 
        [{
            model: StudySession,
            include: [Note] 
        }] 
    });
    res.json(sessionsAndNotes);

}));



module.exports = router;