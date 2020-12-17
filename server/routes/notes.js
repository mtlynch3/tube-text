//notes controller
const express = require('express');
const router = express.Router();
const Note = require('../models/Note')

router.get('/', getAllNotes);

//  SELECT * from notes;
async function getAllNotes(req, res) {
    try {
        let notes = await Note.findAll();
        console.log(notes);
        res.sendStatus(200);
    } catch(err) {
        console.error(err);
    } 
};

module.exports = router;