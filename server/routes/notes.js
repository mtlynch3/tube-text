//notes controller
const express = require('express');
const router = express.Router();
const Note = require('../models/Note')

router.get('/', getAllNotes);

//  SELECT * from notes;
function getAllNotes(req, res) {
    Note.findAll()
        .then(notes => {
            console.log(notes); 
            res.sendStatus(200);
        })
        .catch(err => console.log(err));
};

module.exports = router;