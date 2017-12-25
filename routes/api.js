var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth').auth;

// get all resources
var tasksRoutes = require('./api/courses');

// Set additional routes
router.use('/courses', tasksRoutes);

module.exports = router;
