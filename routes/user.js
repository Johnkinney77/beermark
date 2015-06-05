var express = require('express');
var router = express.Router()

//psql access
var psqlpassword = require('../psqlpassword.js');
var pg = require('pg');
var conString = "pg://" + psqlpassword + "@localhost/beermark_development";
var client = new pg.Client(conString);
client.connect(function(){
});


router.get('/:id', function (req, res) {
  client.query("SELECT * FROM users WHERE id=" + req.params.id + ";", function (err, result){
    res.send(result);
  });
});

    // var breweries = require('./breweries.js');

    // init api route. all api routes will begin with /api
module.exports = router