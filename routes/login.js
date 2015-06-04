var express = require('express');
var app = express();
var passport = require('passport');
var fs = require('fs');
var loginControllers = require('../app/controllers/login.js');

var router = express.Router()

router.get('/', loginControllers.index)

router.post('/login', loginControllers.login);

router.get('/signup', loginControllers.signup);

router.post('/signup', loginControllers.newUser);

    // var breweries = require('./breweries.js');

    // init api route. all api routes will begin with /api
module.exports = router