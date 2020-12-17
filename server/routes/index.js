const express = require('express');
const router = express.Router();

// Subrouters;
const usersRouter = require('./users_controller');
const studySessionsRouter = require('./study_session_controller');
const noteRouter = require('./notes_controller');

router.use('/users', usersRouter);
router.use('/studysessions', studySessionsRouter);
router.use('/notes', noteRouter);


// Export our apiRouter, so that it can be used by our main app in app.js;
module.exports = router;