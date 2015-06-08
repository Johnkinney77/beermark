var express = require('express');
var app = express();
var session = require('express-session');
var bcrypt = require('bcrypt');

//middleware
var cookieParser = require('cookie-parser')
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var morgan = require('morgan');

//psql access
var psqlpassword = require('./psqlpassword.js')
var pg = require('pg');
var conString = "pg://" + psqlpassword + "@localhost/beermark_development";
var client = new pg.Client(conString);
client.connect();



//initiating middleware
app.use(methodOverride('_method'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(morgan('dev'));
app.use(cookieParser())


//checking cookies
// app.use(function (req, res, next) {
//   console.log("Cookies: ", req.cookies)
//   next()
// })

// app.use(session({
//   secret: secret.password,
//   resave: false,
//   saveUninitialized: true
// }));

//pulling routes
app.use('/venue', require('./routes/venue.js'));
app.use('/user', require('./routes/user.js'));
app.use('/brewery', require('./routes/brewery.js'));
app.use('/beers', require('./routes/beers.js'));
app.use('/', require('./routes/login.js'));


//setting static folder
app.use(express.static('public'));

//initializing server
app.listen(3000, function() {
  console.log('Listening on port 3000...')
})