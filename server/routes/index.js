const express = require('express');
const router = express.Router();

// Subrouters;
const usersRouter = require('./users');
const studySessionsRouter = require('./studysessions');
const noteRouter = require('./notes');

// Mount subrouters for api router
router.use('/users', usersRouter);
router.use('/studysessions', studySessionsRouter);
router.use('/notes', noteRouter);

  
// Export api router for use in main app (app.js)
module.exports = router;