const express = require('express');
const router = express.Router();

// Subrouters;
const usersRouter = require('./users');
const studySessionsRouter = require('./studysessions');
const noteRouter = require('./notes');

router.use('/users', usersRouter);
router.use('/studysessions', studySessionsRouter);
router.use('/notes', noteRouter);




// Export our apiRouter, so that it can be used by our main app in app.js;
module.exports = router;