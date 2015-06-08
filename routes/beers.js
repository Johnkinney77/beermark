var express = require('express');
var app = express();
var router = express.Router();
var beersController = require('../app/controllers/beers.js');


//get all beers for brewery
router.get('/', beersController.breweryAllBeers);


//post new beer
router.post('/', beersController.breweryNewBeer);


//update route
router.put('/:id', beersController.breweryUpdateBeer);


//delete route
router.delete('/:id', beersController.breweryDeleteBeer);

// init api route. all api routes will begin with /api
module.exports = router