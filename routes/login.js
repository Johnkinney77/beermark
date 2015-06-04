var express = require('express');
var app = express();
var passport = require('passport');
var fs = require('fs');
var loginControllers = require('../app/controllers/login.js');

var router = express.Router()

router.get('/', loginControllers.index)

router.post('/login', loginControllers.login);

router.get('/signup/user', loginControllers.signupUser);

router.get('/signup/venue', loginControllers.signupVenue);

router.get('/signup/brewery', loginControllers.signupBrewery);

router.post('/signup/user', loginControllers.newUser);

router.post('/signup', loginControllers.newUser);

    // var breweries = require('./breweries.js');

    // init api route. all api routes will begin with /api
module.exports = router