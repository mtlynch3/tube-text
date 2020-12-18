//notes controller
const express = require('express');
const router = express.Router();
const Note = require('../models/Note')

//get all notes
//  SELECT * from notes;
router.get('/', async (req, res, next) => {
    try {
        let notes = await Note.findAll();
        res.status(200).json(notes);
    } catch(err) {
        next(err); //error sent to error-handling middleware
    } 
});


module.exports = router;