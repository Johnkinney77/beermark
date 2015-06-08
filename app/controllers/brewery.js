var breweryController = {};

//dependencies
var express = require('express');
var app = express();
var router = express.Router()
var fs = require('fs');


//psql access
var psqlpassword = require('../../psqlpassword.js');
var pg = require('pg');
var conString = "pg://" + psqlpassword + "@localhost/beermark_development";
var client = new pg.Client(conString);
client.connect(function(){
});

//Grabbing brewery Information
breweryController.breweryInformation = function (req, res) {
  client.query("SELECT * FROM breweries WHERE user_id=" + req.cookies.user_id + ";", function (err, result){
    res.send(result.rows[0]);
  });
};

module.exports = breweryController