var beermark = beermark || { Models: {}, Collections: {}, Views: {} };
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
});
beermark.Models.Brewery = Backbone.Model.extend({
  urlRoot: '/brewery'
});
beermark.Models.User = Backbone.Model.extend({
  urlRoot: '/user'
});


beermark.Models.VenueBeers = Backbone.Model.extend({
});


beermark.Models.Venue = Backbone.Model.extend({
  urlRoot: '/venue'
});
beer = "<form><label>Name<input data-input='name' value='{{name}}'/></label><label>ABV<input data-input='abv' value='{{abv}}'/></label><label>Season<input data-input='season' value='{{season}}'/></label><label>Style<input data-input='style' value='{{style}}'/></label><label>Yeast<input data-input='yeast' value='{{yeast}}'/></label><label>IBU<input data-input='ibu' value='{{ibu}}'/></label><label>EBC<input data-input='ebc' value='{{ebc}}'/></label><label>Aged<input data-input='aged' value='{{aged}}'/></label><label>Beer Description<textarea data-input='description'>{{description}}</textarea></label><button class='save'>Save</button><button class='delete'>Delete</button></form>"

breweryBeerLayoutTemplate = "<div id='beer-list'></div><div id='add-beer'></div>"

breweryAddBeer = "<button id='new-beer-button'>New Beer</button>"

beermark.Views.BreweryBeer = Backbone.Marionette.ItemView.extend({
  template: beer,
  tagName: 'div',
  events: {
    'click .save': 'save',
    'click .delete': 'delete'
  },
  save: function(e) {
    e.preventDefault()
    var name = this.$el.find('input[data-input="name"]').val();
    var abv = this.$el.find('input[data-input="abv"]').val();
    var season = this.$el.find('input[data-input="season"]').val();
    var style = this.$el.find('input[data-input="style"]').val();
    var yeast = this.$el.find('input[data-input="yeast"]').val();
    var ibu = this.$el.find('input[data-input="ibu"]').val();
    var ebc = this.$el.find('input[data-input="ebc"]').val();
    var aged = this.$el.find('input[data-input="aged"]').val();
    var description = this.$el.find('textarea[data-input="description"]').val();

    this.model.set({'name': name, 'abv': abv, 'season': season, 'style': style, 'yeast': yeast, 'ibu': ibu, 'ebc': ebc, 'aged': aged, 'description': description });
    this.model.save();
  },
  delete: function(e){
    e.preventDefault()
    this.model.destroy();
  }
});

beermark.Views.BreweryAddBeer = Backbone.Marionette.ItemView.extend({
  template: breweryAddBeer,
  tagName: 'div',
  events: {
    'click #new-beer-button': 'triggerAddBeerForm'
  },
  triggerAddBeerForm: function(){
    var beer = new beermark.Models.Beer
    beermark.beers.add(beer)
  }
})



beermark.Views.BreweryBeerLayoutView = Marionette.LayoutView.extend({
  tagName: 'div',
  template: breweryBeerLayoutTemplate,
  regions: {
    beerRegion: "#beer-list",
    addBeerRegion: "#add-beer"
  },
  onRender: function() {
    var beer = new beermark.Collections.mBreweryBeers({
            collection: beermark.beers
        });
    this.beerlist = beer.collection.models
    var addBeer = new beermark.Views.BreweryAddBeer();
    this.beerRegion.show(beer);
    this.addBeerRegion.show(addBeer)
  },
  childEvents: {
    'save:ya': function (e){
      console.log('saved')
      console.log(this.beerlist)
      this.beerlist.each(function(beer) {
        beer.save();
      });
    }
  }
});
var breweryNav = '<div><nav><a href="#"><img src="./imgs/logo.svg"></a><a href="#/brewery/{{name}}/beers">Your Beers</a><a href="#/logout">logout</a></nav></div>'

var breweryInfo = "<div><form method='POST' action='/brewery'><input name='name' value='{{name}}' placeholder='Name'/><img src='{{logo}}'><input name='logo' value='{{logo}}' placeholder='logo url'/><button>Submit</button><form></div>"


beermark.Views.BreweryNav = Backbone.Marionette.ItemView.extend({
  template: breweryNav
});

beermark.Views.BreweryInfo = Backbone.Marionette.ItemView.extend({
  onBeforeRender: function(){
    
  },
  template: breweryInfo
});



var userNav = '<div><nav><a href="#"><img src="./imgs/logo.svg"></a><a id="search" href="#/search">Find Beer!</a><a href="/user">Your Marks</a><a href="#/user/settings">User Settings</a><a href="#/logout">Logout</a></nav></div>'

var userInfo = "<div><form><input data-input='firstname' value='{{firstname}}'/><input data-input='lastname' value='{{lastname}}'/><input  data-input='email' value='{{email}}'/><button id='submit'>Submit</button></form></div>"

beermark.Views.UserNav = Backbone.Marionette.ItemView.extend({
  template: userNav
});

beermark.Views.UserInfo = Backbone.Marionette.ItemView.extend({
  region: myApp.mainRegion,
  template: userInfo,
  triggers: {
    'click #submit': 'save'
  }
});



venueBeer = "<form><label>Brewery Name<input data-input='breweryname' value='{{breweryname}}'/></label><label>Beer Name<input data-input='beername' value='{{beername}}'/></label><label>Container<input data-input='container' value='{{container}}'/></label><label>Price<input data-input='price' value='{{price}}'/></label><label>Stock<input data-input='stock' value='{{stock}}'/><button class='save'>Save</button><button class='delete'>Delete</button></form>"

venueBeerLayoutTemplate = "<div id='beer-list'></div><div id='add-beer'></div>"

venueBeerAddBeer = "<button id='new-beer-button'>New Beer</button>"

beermark.Views.VenueBeers = Backbone.Marionette.ItemView.extend({
  template: venueBeer,
  tagName: 'div',
  events: {
    'click .save': 'save',
    'click .delete': 'delete'
  },
  save: function(e) {
    e.preventDefault()
    var stock = this.$el.find('input[data-input="stock"]').val();
    var breweryname = this.$el.find('input[data-input="breweryname"]').val();
    var beername = this.$el.find('input[data-input="beername"]').val();
    var container = this.$el.find('input[data-input="container"]').val();
    var price = this.$el.find('input[data-input="price"]').val();

    this.model.set({'stock': stock, 'brewery_id': breweryname, 'beer_id': beername, 'container': container, 'price': price});
    // this.model.set({'name': name, 'abv': abv, 'season': season, 'style': style, 'yeast': yeast, 'ibu': ibu, 'ebc': ebc, 'aged': aged, 'description': description });
    this.model.save();
  },
  delete: function(e){
    e.preventDefault()
    this.model.destroy();
  }
});

beermark.Views.VenueBeerAddBeer = Backbone.Marionette.ItemView.extend({
  template: venueBeerAddBeer,
  tagName: 'div',
  events: {
    'click #new-beer-button': 'triggerAddBeerForm'
  },
  triggerAddBeerForm: function(){
    var beer = new beermark.Models.VenueBeers
    beermark.venueBeers.add(beer)
  }
})



beermark.Views.VenueBeerLayoutView = Marionette.LayoutView.extend({
  tagName: 'div',
  template: venueBeerLayoutTemplate,
  regions: {
    beerRegion: "#beer-list",
    addBeerRegion: "#add-beer"
  },
  onRender: function() {
    var beer = new beermark.Collections.mVenueBeers({
            collection: beermark.venueBeers
        });
    this.beerlist = beer.collection.models
    var addBeer = new beermark.Views.VenueBeerAddBeer();
    this.beerRegion.show(beer);
    this.addBeerRegion.show(addBeer)
  },
  childEvents: {
    'save:ya': function (e){
      console.log('saved')
      console.log(this.beerlist)
      this.beerlist.each(function(beer) {
        beer.save();
      });
    }
  }
});
var venueNav = '<div><nav><a href="#"><img src="./imgs/logo.svg"></a><a href="#/venue/{{name}}/beers">Your Beer!</a><a href="#/logout">Logout</a></nav></div>'

var venueInfo = "<div><form><input data-input='firstname' value='{{firstname}}'/><input data-input='lastname' value='{{lastname}}'/><input  data-input='email' value='{{email}}'/><button id='submit'>Submit</button></form></div>"

beermark.Views.VenueNav = Backbone.Marionette.ItemView.extend({
  template: venueNav
});

beermark.Views.VenueInfo = Backbone.Marionette.ItemView.extend({
  template: venueInfo
});



beermark.Collections.bBreweryBeers = Backbone.Collection.extend({
  model: beermark.Models.Beer,
  url: '/beers',
  comparator: 'name',
  initialize: function () {
     this.listenTo(this.collection, 'add', this.render);
  }
})

beermark.Collections.mBreweryBeers = Marionette.CollectionView.extend({

  childView: beermark.Views.BreweryBeer
});

beermark.Collections.bVenueBeers = Backbone.Collection.extend
  ({
  model: beermark.Models.VenueBeers,
  url: '/venue/beers',
  comparator: 'stock',
  initialize: function () {
     this.listenTo(this.collection, 'add', this.render);
  }
})

beermark.Collections.mVenueBeers = Marionette.CollectionView.extend({

  childView: beermark.Views.VenueBeers
});

var Router = Backbone.Router.extend({

    routes: {
      '': 'index',
      'logout': 'logout',
      'user/settings' : 'update',
      'brewery/:breweryName/beers': 'breweryBeers',
      'venue/:venueName/beers': 'venueBeers',
      'search': 'search'
    },

    index: function (){

      //switch case to determine what html to be served up to what type of user
      switch(beermark.role_id) {
        case "1":
        var nav = new beermark.Views.UserNav();
        myApp.navigationRegion.show(nav)
        break;
        case "2":
        console.log('hi')
        var nav = new beermark.Views.VenueNav({
            model: beermark.venue
        });
        myApp.navigationRegion.show(nav)
        var info = new beermark.Views.VenueInfo({
            model: beermark.currentUser
        });
        myApp.mainRegion.show(info)
        break;
        case "3":
        var nav = new beermark.Views.BreweryNav({
            model: beermark.brewery
        });
        myApp.navigationRegion.show(nav)
        var info = new beermark.Views.BreweryInfo({
            model: beermark.brewery
        });
        myApp.mainRegion.show(info)
        break;
      }
    },

    //logout removes all cookies redirects them to homepage
    logout: function(){
        document.cookie = 'user_id =; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = 'role_id =; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = 'brewery_id =; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = 'venue_id =; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        window.location.replace("/");
    },

    //update is the user update switch case is to determine which user gets what
    update: function(){
        var nav = new beermark.Views.UserNav();
        myApp.navigationRegion.show(nav)
        var info = new beermark.Views.UserInfo({model: beermark.currentUser});
        myApp.mainRegion.show(info)

        info.on("save", function(){
            var firstname = this.$el.find('input[data-input="firstname"]').val();
            var lastname = this.$el.find('input[data-input="lastname"]').val();
            var email = this.$el.find('input[data-input="email"]').val();

            this.model.set('firstname', firstname);
            this.model.set('lastname', lastname);
            this.model.set('email', email);
            this.model.save();
        });
    },

    // breweries beers page
    breweryBeers: function (){
        var nav = new beermark.Views.BreweryNav({
            model: beermark.brewery
        });
        myApp.navigationRegion.show(nav)
        var layout = new beermark.Views.BreweryBeerLayoutView();
        myApp.mainRegion.show(layout)
    },

    //venue beers page
    venueBeers: function (){
        var nav = new beermark.Views.VenueNav({
            model: beermark.venue
        });
        myApp.navigationRegion.show(nav)
        var layout = new beermark.Views.VenueBeerLayoutView();
        myApp.mainRegion.show(layout)
    },
    search: function () {
      var nav = new beermark.Views.VenueNav({
            model: beermark.venue
        });
      myApp.navigationRegion.show(nav)
      function initialize() {
        geocoder = new google.maps.Geocoder();
        var address = beermark.currentUser.default_address
        geocoder.geocode( { 'address': '2410 28th street, Astoria NY, 11102'}, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            var myLatlng = new google.maps.LatLng(results[0].geometry.location.A, results[0].geometry.location.F);
            var mapOptions = {
              zoom: 15,
              center: myLatlng
            }
            var map = new google.maps.Map(document.getElementById('main'), mapOptions);

            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                title: 'Hello World!'
            });
          }
        });
      }
      initialize();
    }
});

// login servering up right information based on users Role
switch (beermark.role_id) {
    case '1':

    //fetching all info for normal user
    beermark.currentUser = new beermark.Models.User({id: beermark.user_id});
    promise = beermark.currentUser.fetch();
    break;
    case '2':

    //fetching information for venue
    beermark.currentUser = new beermark.Models.User({id: beermark.user_id});
    beermark.currentUser.fetch();
    beermark.venue = new beermark.Models.Venue({id:beermark.user_id});
    promise = beermark.venue.fetch()
    promise.done(function (){
        document.cookie = 'venue_id=' + beermark.venue.id;
    });
    break;
    case '3':

    //fethcing information for brewery
    beermark.currentUser = new beermark.Models.User({id: beermark.user_id});
    beermark.currentUser.fetch();
    beermark.brewery = new beermark.Models.Brewery({id: beermark.user_id});
    beermark.brewery.fetch();
    beermark.beers = new beermark.Collections.bBreweryBeers();
    promise = beermark.beers.fetch();
    promise.done(function (){
        document.cookie='brewery_id=' + beermark.brewery.id;
    });
    break;
}

promise.done(function(){
    //needed to make if else statement for venue, couldn't do another fetch with in a promise, had to separate them. Don't know if this until I get it on a server.
    // 'if' for venues
    if(beermark.venue){
        beermark.venueBeers = new beermark.Collections.bVenueBeers();
        beermark.venueBeers.fetch({
            success: function (model, response){
                console.log(model)
                console.log(response)
            }
        })
            var myRouter = new Router();
            Backbone.history.start();
    // else for everything else
    } else {
        var myRouter = new Router();
        Backbone.history.start();
    }
});
  
