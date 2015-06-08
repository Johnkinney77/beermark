var beersController = {};

var express = require('express');
var app = express();
var router = express.Router();
var fs = require('fs');

//psql access
var psqlpassword = require('../../psqlpassword.js');
var pg = require('pg');
var conString = "pg://" + psqlpassword + "@localhost/beermark_development";
var client = new pg.Client(conString);
client.connect(function(){
});


//get all beers for brewery
beersController.breweryAllBeers = function (req, res) {
  client.query("SELECT * FROM beers WHERE user_id=" + req.cookies.user_id + ";", function (err, result){
    res.send(result.rows);
  });
};

//post new beer
beersController.breweryNewBeer = function (req, res) {
  client.query("INSERT INTO beers (user_id, name, abv, style, season, ebc, ibu, aged, description, yeast) values (" + req.cookies.user_id + ", '" + req.body.name + "', '" + req.body.abv + "', '" + req.body.style + "', '" + req.body.season + "', '" + req.body.ebc + "', '" + req.body.ibu + "', '" + req.body.aged + "', '" + req.body.description + "', '" + req.body.yeast + "');", function (err, result){
  });
    res.end()
};

//update beer route
beersController.breweryUpdateBeer = function (req, res) {
  console.log(req.body)
  console.log(req.params.id)
  client.query("UPDATE beers SET name='" + req.body.name + "', season='" + req.body.season + "', style='" + req.body.style + "' WHERE id=" + req.params.id + ";", function (err, data) {
  });
  res.end()
};

//delete route
beersController.breweryDeleteBeer = function (req, res) {
  client.query("DELETE FROM beers WHERE id=" + req.params.id + ";", function (err, data) {
  });
  res.end()
};

// init api route. all api routes will begin with /api
module.exports = beersController