var express = require('express');
var app = express();
var router = express.Router()
var breweryControllers = require('../app/controllers/brewery.js');

//routes
router.get('/:id', breweryControllers.breweryInformation);

module.exports = router