//study sessions controller: /api/studysessions/
const express = require('express');
const router = express.Router();
const { User, StudySession, Note } = require("../models");

//so we don't have to use try-catch for each request handler
const ash = require('express-async-handler');

/******************* GET *******************/

//get all study sessions in table
router.get('/', ash(async(req, res) => {
    let sessions = await StudySession.findAll();
    res.status(200).json(sessions);
}));

//get study session by id
router.get('/:id', ash(async(req, res) => {
    let session = await StudySession.findByPk(req.params.id);
    res.status(200).json(session);
}));

//	gets all study sessions of given userId
router.get('/users/:id', ash(async(req, res) => {
    let sessions = await StudySession.findAll({
        include: [User],
        where: {
            userId: req.params.id
        }
    });
    res.status(200).json(sessions);
}));

/******************* POST *******************/

router.post('/add', ash(async(req, res) => {
    let newSession = await StudySession.create(req.body);
    res.status(201).json(newSession);
}));

/******************* DELETE  *********************/

router.delete('/delete/:id', ash(async(req, res) => {
    await StudySession.destroy({where: {id: req.params.id}});
    res.sendStatus(204);
}));

/******************* EDIT *********************/
//??? tbd

module.exports = router;