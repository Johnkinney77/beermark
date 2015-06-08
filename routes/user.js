var express = require('express');
var app = express();
var router = express.Router();
var userControllers = require('../app/controllers/user.js');

//routes
router.get('/:id', userControllers.getUserInformation);

router.put('/:id', userControllers.updateUserInformation);

// init api route. all api routes will begin with /api
module.exports = router