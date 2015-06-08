var express = require('express');
var app = express();
var router = express.Router()

//psql access
var psqlpassword = require('../psqlpassword.js');
var pg = require('pg');
var conString = "pg://" + psqlpassword + "@localhost/beermark_development";
var client = new pg.Client(conString);
client.connect(function(){
});


router.get('/:id', function (req, res) {
  console.log('hi')
  client.query("SELECT * FROM breweries WHERE user_id=" + req.cookies.user_id + ";", function (err, result){
    res.send(result.rows[0]);
  });
});

// router.get('/search', function (req, res) {
//   res.send('Search');
// });


// init api route. all api routes will begin with /api
module.exports = router