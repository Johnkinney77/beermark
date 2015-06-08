var userController = {};

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
  console.log('client connected');
});

//get user information
userController.getUserInformation = function (req, res) {
  client.query("SELECT * FROM users WHERE id=" + req.params.id + ";", function (err, result){
    res.send(result.rows[0]);
  });
}

//update user information
userController.updateUserInformation = function (req, res) {
  client.query("UPDATE users SET firstname='" + req.body.firstname + "', lastname='" + req.body.lastname + "', email='" + req.body.email + "' WHERE id=" + req.cookies.user_id + ";", function(err, data) {

  });
  res.end()
}

// init api route. all api routes will begin with /api
module.exports = userController