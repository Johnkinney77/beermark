var express = require('express');
var app = express();
var router = express.Router();


//psql access
var psqlpassword = require('../psqlpassword.js');
var pg = require('pg');
var conString = "pg://" + psqlpassword + "@localhost/beermark_development";
var client = new pg.Client(conString);
client.connect(function(){
  console.log('connected')
});

//route to get all venue beers
router.get('/beers', function (req, res) {
  client.query("SELECT venueBeerJoin.id, venueBeerJoin.venue_id, venueBeerJoin.brewery_id, venueBeerJoin.beer_id, venueBeerJoin.container, venueBeerJoin.price, venueBeerJoin.stock, beers.name AS beername, breweries.name AS breweryname FROM venueBeerJoin LEFT JOIN beers ON beers.id = venueBeerJoin.beer_id LEFT JOIN breweries ON venueBeerJoin.brewery_id = breweries.id WHERE venueBeerJoin.venue_id =" + req.cookies.venue_id + ";", function (err, result) {
    res.send(result.rows)
  });
});

router.post('/beers', function (req, res) {
  console.log(req.body)
  console.log("venue_id " + req.cookies.venue_id)
  client.query("INSERT INTO venueBeerJoin (venue_id, brewery_id, beer_id, container, price, stock) VALUES (" + req.cookies.venue_id + ", " + req.body.brewery_id + ", " + req.body.beer_id + ", '" + req.body.container + "', " + req.body.price + ", " + req.body.stock + ");", function (err, result) {
    res.end()
  });
});

router.put('/beers/:id', function (req, res) {
  console.log(req.body)
  console.log(req.cookies.venue_id)
  console.log("UPDATE venueBeerJoin SET stock=" + req.body.stock + ", container='" + req.body.container + "', venue_id=" + req.body.venue_id + ", beer_id=" + req.body.beer_id + ", brewery_id=" + req.body.brewery_id + ", price=" + req.body.price + " WHERE id=" + req.body.id + ";")
  client.query("UPDATE venueBeerJoin SET stock=" + req.body.stock + ", container='" + req.body.container + "', venue_id=" + req.body.venue_id + ", beer_id=" + req.body.beer_id + ", brewery_id=" + req.body.brewery_id + ", price=" + req.body.price + " WHERE id=" + req.body.id + ";", function (err, result) {
  });
    res.end()
});

router.delete('/beers/:id', function (req, res) {
  console.log(req.body)
  client.query("DELETE FROM venueBeerJoin WHERE id=" + req.params.id + ";", function (err, data) {
  });
  res.end()
});

router.get('/:id', function (req, res) {
  client.query("SELECT * FROM venues WHERE user_id='" + req.params.id + "';", function (err, result) {
  res.send(result.rows[0]);
  });
});



    // var breweries = require('./breweries.js');

    // init api route. all api routes will begin with /api
module.exports = router