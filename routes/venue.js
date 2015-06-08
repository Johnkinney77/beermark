var express = require('express');
var app = express();
var router = express.Router();
var venueControllers = require('../app/controllers/venue.js');

//routes

//route to get all venue beers
router.get('/beers', venueControllers.venueAllBeers);

// posting new beers
router.post('/beers', venueControllers.venueNewBeer);

//updating a venue beer list 
router.put('/beers/:id', venueControllers.venueUpdateBeer);

//deleting a beer on a venue beer list
router.delete('/beers/:id', venueControllers.venueDeleteBeer);

//searching for beer
router.get('/beers/search', venueControllers.search);

//getting the venues information
router.get('/:id', venueControllers.venueInformation);

module.exports = router