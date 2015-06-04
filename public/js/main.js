var beermark = beermark || { Models: {}, Collection: {}, Views: {} };
var split = document.cookie.split('; ')

//setting role or user and user ID for easy access
beermark.role_id = split[0].replace("cokkieName=", "");
beermark.user_id = split[1].replace("user_id=", "");

myApp = new Backbone.Marionette.Application();


myApp.addRegions({
  navigationRegion: "#navigation",
  mainRegion: "#main"
});
beermark.Models.Beer = Backbone.Model.extend({
  rootURL: "/beer"
});
beermark.Models.Brewery = Backbone.Model.extend({
  urlRoot: '/brewery'
});
beermark.Models.User = Backbone.Model.extend({
  urlRoot: '/users'
});
beermark.Models.Venue = Backbone.Model.extend({
  urlRoot: '/venue'
});



var breweryNav = '<h1>welcome to brewery Nav</h1>'

var breweryInfo = "<form method='POST' action='/brewery'><input name='name' placeholder='Name'/><input name='logo_url' placeholder='logo_url'/><button>Submit</button>"

beermark.Views.BreweryNav = Backbone.Marionette.ItemView.extend({
  template: breweryNav
});

beermark.Views.BreweryInfo = Backbone.Marionette.ItemView.extend({
  template: breweryInfo
});



// MainView = Backbone.Marionette.LayoutView.extend({
//   template: '#maintemplate',
//   appendHtml: function(){
//     if (beermark.user_id === "1") {
//       console.log('user');
//     } else if (beermark.user_id === "2") {
//     console.log('venue');
//     } else if (beermark.user_id === "3") {
//     console.log('brewery');
//     } else {
//     console.log('not a user');
//     }
    
//   }
// });


// beermark.Views.UserMain = Backbone.Marionette.ItemView.extend({
//   template: $("#userMain")
// });

// var layoutView = new MainView();

// var userView = new beermark.Views.UserMain();

// layoutView.addRegions({
//     navigationRegion: "#navigation",
//     mainRegion: "#main",
//     newBeerRegion: "#new-beer",
//     suggestedBeerRegion: "#suggested-beer",
//   })
var userNav = '<h1>welcome to User Nav</h1>'

var userInfo = "<form method='POST' action='/brewery'><input name='name' placeholder='Name'/><input name='logo_url' placeholder='logo_url'/><button>Submit</button>"

beermark.Views.UserNav = Backbone.Marionette.ItemView.extend({
  template: userNav
});

beermark.Views.UserInfo = Backbone.Marionette.ItemView.extend({
  template: userInfo
});


var venueNav = '<h1>welcome to Venue Nav</h1>'

var venueInfo = "<form method='POST' action='/brewery'><input name='name' placeholder='Name'/><input name='logo_url' placeholder='logo_url'/><button>Submit</button>"

beermark.Views.VenueNav = Backbone.Marionette.ItemView.extend({
  template: venueNav
});

beermark.Views.VenueInfo = Backbone.Marionette.ItemView.extend({
  template: venueInfo
});


var Router = Backbone.Router.extend({

    routes: {
      '': 'index'
    },

    index: function (){

      //switch case to determine what html to be served up to what type of user
      switch(beermark.role_id) {
        case "1":
        var nav = new beermark.Views.UserNav();
        myApp.navigationRegion.show(nav)
        var info = new beermark.Views.UserInfo();
        myApp.mainRegion.show(info)
        break;
        case "2":
        var nav = new beermark.Views.VenueNav();
        myApp.navigationRegion.show(nav)
        var info = new beermark.Views.VenueInfo();
        myApp.mainRegion.show(info)
        break;
        case "3":
        var nav = new beermark.Views.BreweryNav();
        myApp.navigationRegion.show(nav)
        var info = new beermark.Views.BreweryInfo();
        myApp.mainRegion.show(info)
        break;
      }
    }
});
  
  
var myRouter = new Router();
Backbone.history.start();
