var loginController = {};

var fs = require('fs');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');

//psql access
var psqlpassword = require('../../psqlpassword.js');
var pg = require('pg');
var conString = "pg://" + psqlpassword + "@localhost/beermark_development";
var client = new pg.Client(conString);
client.connect(function(){
  console.log('client connected');
});



//index for login with out cookie
loginController.index = function(req, res) {
  var role_id = req.cookies.cokkieName
  if(role_id) {
    var html = fs.readFileSync('./app/assets/views/singlePage.html', 'utf8')
    res.send(html);
  } else {
    var html = fs.readFileSync('./app/views/index.html', 'utf8');
    res.send(html);
  }
};

//checking is username & password are correct, then setting cookie
loginController.login = function(req, res) {
  client.query("SELECT * FROM users WHERE email = '" + req.body.email + "';", function(err, result) {
    var user = result.rows[0]
    if (user === undefined){
      res.send('your username aint right')
    } else if (bcrypt.compareSync(req.body.password, user.password_digest)) {
      res.cookie('cokkieName', user.role_id, { maxAge: 900000});
      //session creation
      // req.session.valid_user = true;
      // console.log(req.session.valid_user)
      res.redirect('/')
      } else {
      res.send('your password aint right')
    }
  });
};

loginController.signup = function(req, res) {
  var html = fs.readFileSync('./app/views/user_signup.html', 'utf8');
  res.send(html);
};

//creating new user
loginController.newUser = function(req, res) {
  var role_id = req.body.role_id
  var email = req.body.email;
  var password = req.body.password;
  var confirm = req.body.confirm;

  if(password != confirm) {
    res.redirect('/signup');
  } else {
    var hash = bcrypt.hashSync(password, 10);
    client.query("INSERT INTO users (email, password, role_id) values ('" + email + "', '" + hash + "', " + role_id + ");");

  }
}

module.exports = loginController