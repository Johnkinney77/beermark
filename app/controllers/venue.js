var venueController = {};

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
  console.log('connected')
});

//route to get all venue beers
venueController.venueAllBeers =  function (req, res) {
  client.query("SELECT venueBeerJoin.id, venueBeerJoin.venue_id, venueBeerJoin.brewery_id, venueBeerJoin.beer_id, venueBeerJoin.container, venueBeerJoin.price, venueBeerJoin.stock, beers.name AS beername, breweries.name AS breweryname FROM venueBeerJoin LEFT JOIN beers ON beers.id = venueBeerJoin.beer_id LEFT JOIN breweries ON venueBeerJoin.brewery_id = breweries.id WHERE venueBeerJoin.venue_id =" + req.cookies.venue_id + ";", function (err, result) {
    res.send(result.rows)
  });
};

// posting new beers
venueController.venueNewBeer =  function (req, res) {
  client.query("INSERT INTO venueBeerJoin (venue_id, brewery_id, beer_id, container, price, stock) VALUES (" + req.cookies.venue_id + ", " + req.body.brewery_id + ", " + req.body.beer_id + ", '" + req.body.container + "', " + req.body.price + ", " + req.body.stock + ");", function (err, result) {
    res.end()
  });
};

//updating a venue beer list 
venueController.venueUpdateBeer = function (req, res) {
  client.query("UPDATE venueBeerJoin SET stock=" + req.body.stock + ", container='" + req.body.container + "', venue_id=" + req.body.venue_id + ", beer_id=" + req.body.beer_id + ", brewery_id=" + req.body.brewery_id + ", price=" + req.body.price + " WHERE id=" + req.body.id + ";", function (err, result) {
  });
    res.end()
};

//deteling a beer on a venue beer list
venueController.venueDeleteBeer = function (req, res) {
  client.query("DELETE FROM venueBeerJoin WHERE id=" + req.params.id + ";", function (err, data) {
  });
  res.end()
};

//searching for beer
venueController.search = function (req, res) {
  client.query("SELECT * FROM (SELECT * FROM(SELECT venueBeerJoin.id, venues.name, venues.address, venues.phone_number, venues.email, venues.website, venues.cover_photo, venues.description, venues.pos FROM venueBeerJoin LEFT JOIN venues ON venues.id = venueBeerJoin.venue_id WHERE venueBeerJoin.beer_id=" + req.query.beer_id +  ") as exampleFirst, round((pos <@> point(" + req.query.lat + ", " + req.query.lng + "))::numeric, 3) as miles order by pos <-> point(" + req.query.lat + ", " + req.query.lng + ")) as exampleSecond WHERE exampleSecond.miles < " + req.query.radius || 5 + ";", function (err, result) {
    res.send(result.rows);
  });
};

//getting the venues information
venueController.venueInformation = function (req, res) {
  client.query("SELECT * FROM venues WHERE user_id='" + req.params.id + "';", function (err, result) {
  res.send(result.rows[0]);
  });
};

module.exports = venueController