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
  var role_id = req.cookies.role_id
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
  client.query("SELECT * FROM users WHERE email = '" + req.body.email + "';", function (err, result) {
    var user = result.rows[0]
    if (user === undefined){
      res.send('your username aint right')
    } else if (bcrypt.compareSync(req.body.password, user.password_digest)) {
      res.cookie('role_id', user.role_id, { maxAge: 900000});
      res.cookie('user_id', user.id, { maxAge: 900000});
      //session creation
      // req.session.valid_user = true;
      // console.log(req.session.valid_user)
      res.redirect('/')
      } else {
      res.send('your password aint right')
    }
  });
};

loginController.signupUser = function(req, res) {
  var html = fs.readFileSync('./app/views/user_signup.html', 'utf8');
  res.send(html);
};

loginController.signupVenue = function(req, res) {
  var html = fs.readFileSync('./app/views/venue_signup.html', 'utf8');
  res.send(html);
};

loginController.signupBrewery = function(req, res) {
  var html = fs.readFileSync('./app/views/brewery_signup.html', 'utf8');
  res.send(html);
};

//creating new user
loginController.newUser = function(req, res) {
  var role_id = req.body.role_id
  var firstName = req.body.firstname;
  var lastName = req.body.lastname;
  var dob = req.body.dob;
  var email = req.body.email;
  var password = req.body.password;
  var confirm = req.body.confirm;

  //if password isn't correct redirects them to signup
  if(password != confirm) {
    res.redirect('/signup');
  } else {

    //checks if email is already taken
    client.query("SELECT email FROM users WHERE email = '" + req.body.email + "';", function (err, result) {
      var emailexsists = result.rows[0]

      //if username isn't taken submits information
      if(emailexsists === undefined){
        console.log('hit')
        var hash = bcrypt.hashSync(password, 10);
        client.query("INSERT INTO users (firstname, lastname, dob, email, password_digest, role_id) values ('" + firstName + "', '" + lastName + "', '" + dob + "', '" + email + "', '" + hash + "', " + role_id + ");", function (err, result){

          //gets user ID after account is created to serve up right information
          client.query("SELECT ID FROM users WHERE email = '" + email + "';", function (err, result) {
            console.log(result);
            switch(role_id){
              case "1":
                res.cookie('role_id', '1', { maxAge: 900000});
                res.cookie('user_id', result.rows[0].id, { maxAge: 900000})
                res.redirect('/')              
              break;
              case "2":
                res.cookie('role_id', '2', { maxAge: 900000});
                res.cookie('user_id', result.rows[0].id, { maxAge: 900000})
                client.query("INSERT INTO venues (user_id) values (" + result.rows[0].id + ");", function (err, result) {
                  console.log('hi' +result)
                  res.redirect('/')
                });
              break;
              case "3":
                res.cookie('role_id', '3', { maxAge: 900000});
                res.cookie('user_id', result.rows[0].id, { maxAge: 900000})                
                client.query("INSERT INTO breweries (user_id) values (" + result.rows[0].id + ");");
                res.redirect('/')  
              break; 
            }
          });
        });

      //if username is taken
      } else { 
        res.send('username taken');
      };
    });
  }
}

module.exports = loginController