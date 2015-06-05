var beermark = beermark || { Models: {}, Collection: {}, Views: {} };
//setting role or user and user ID for easy access for backbone single page application
var split = document.cookie.split('; ')
beermark.role_id = split[0].replace("role_id=", "");
beermark.user_id = split[1].replace("user_id=", "");


Backbone.Marionette.Renderer.render = function(template, data){
  return Mustache.render(template, data);
}




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
  urlRoot: '/user/' + beermark.user_id
});


beermark.Models.Venue = Backbone.Model.extend({
  urlRoot: '/venue'
});



var breweryNav = '<div><nav><a href="/logout">logout</a></nav></div>'

var breweryInfo = "<div><form method='POST' action='/brewery'><input name='name' placeholder='Name'/><input name='logo_url' placeholder='logo_url'/><button>Submit</button><form></div>"

beermark.Views.BreweryNav = Backbone.Marionette.ItemView.extend({
  template: breweryNav
});

beermark.Views.BreweryInfo = Backbone.Marionette.ItemView.extend({
  onBeforeRender: function(){
    
  },
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
var userNav = '<div><nav><a href="/"><img src="./imgs/logo.svg"></a><a href="#/search">Find Beer!</a><a href="/user">Your Marks</a><a href="#/logout">Logout</a></nav></div>'

var userInfo = "<div><form method='POST' action='/user/{{user_id}}'><input name='firstname' value='{{firstname}}'/><input name='lastname' value='{{lastname}}'/><input name='email' value='{{email}}'/><input name='logo_url' placeholder='logo_url'/><button>Submit</button></form></div>"

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
      '': 'index',
      'logout': 'logout'
    },

    index: function (){

      //switch case to determine what html to be served up to what type of user
      switch(beermark.role_id) {
        case "1":
        var nav = new beermark.Views.UserNav();
        myApp.navigationRegion.show(nav)
        var info = new beermark.Views.UserInfo({
            model: beermark.currentUser
        });
        console.log(beermark.currentUser.attributes.rows)
        myApp.mainRegion.show(info)
        break;
        case "2":
        var nav = new beermark.Views.VenueNav();
        myApp.navigationRegion.show(nav)
        var info = new beermark.Views.VenueInfo({
            model: beermark.currentUser
        });
        myApp.mainRegion.show(info)
        break;
        case "3":
        var nav = new beermark.Views.BreweryNav();
        myApp.navigationRegion.show(nav)
        var info = new beermark.Views.BreweryInfo({
            model: beermark.currentUser
        });
        myApp.mainRegion.show(info)
        break;
      }
    },

    logout: function(){
        document.cookie = 'user_id =; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = 'role_id =; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        window.location.replace("/");
    }
});
  
  

var UserRouter = Backbone.Router.extend({


});

beermark.currentUser = new beermark.Models.User()
beermark.currentUser.fetch()
 
// $(function(){
// $.ajax({
//   url: '/user/' + beermark.user_id,
//   type: "GET"
// }).done(function (data){
//   beermark.currentUser = data.rows[0]
  var myRouter = new Router();
  Backbone.history.start();
// });
// });
 
