//creating name spacing
var beermark = beermark || { Models: {}, Collections: {}, Views: {} };

//setting role or user and user ID for easy access for backbone single page application
var split = document.cookie.split('; ')
beermark.role_id = split[0].replace("role_id=", "");
beermark.user_id = split[1].replace("user_id=", "");

//making marionette render with mustache
Backbone.Marionette.Renderer.render = function(template, data){
  return Mustache.render(template, data);
}

//creating new marionette application
myApp = new Backbone.Marionette.Application();

//adding regions to application
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
//templates
beer = "<form><label>Name<input data-input='name' value='{{name}}'/></label><label>ABV<input data-input='abv' value='{{abv}}'/></label><label>Season<input data-input='season' value='{{season}}'/></label><label>Style<input data-input='style' value='{{style}}'/></label><label>Yeast<input data-input='yeast' value='{{yeast}}'/></label><label>IBU<input data-input='ibu' value='{{ibu}}'/></label><label>EBC<input data-input='ebc' value='{{ebc}}'/></label><label>Aged<input data-input='aged' value='{{aged}}'/></label><label>Beer Description<textarea data-input='description'>{{description}}</textarea></label><button class='save'>Save</button><button class='delete'>Delete</button></form>"

breweryBeerLayoutTemplate = "<div id='beer-list'></div><div id='add-beer'></div>"

breweryAddBeer = "<button id='new-beer-button'>New Beer</button>"

//View for a single beer
beermark.Views.BreweryBeer = Backbone.Marionette.ItemView.extend({
  template: beer,
  tagName: 'div',
  events: {
    'click .save': 'save',
    'click .delete': 'delete'
  },

  //save event
  save: function(e) {
    e.preventDefault()

    //getting information from form
    var name = this.$el.find('input[data-input="name"]').val();
    var abv = this.$el.find('input[data-input="abv"]').val();
    var season = this.$el.find('input[data-input="season"]').val();
    var style = this.$el.find('input[data-input="style"]').val();
    var yeast = this.$el.find('input[data-input="yeast"]').val();
    var ibu = this.$el.find('input[data-input="ibu"]').val();
    var ebc = this.$el.find('input[data-input="ebc"]').val();
    var aged = this.$el.find('input[data-input="aged"]').val();
    var description = this.$el.find('textarea[data-input="description"]').val();

    //setting model information
    this.model.set({'name': name, 'abv': abv, 'season': season, 'style': style, 'yeast': yeast, 'ibu': ibu, 'ebc': ebc, 'aged': aged, 'description': description });

    //saving model
    this.model.save();
  },

  //deleteing beer
  delete: function(e){
    e.preventDefault()
    this.model.destroy();
  }
});

//View for the add beer button
beermark.Views.BreweryAddBeer = Backbone.Marionette.ItemView.extend({
  template: breweryAddBeer,
  tagName: 'div',
  events: {
    'click #new-beer-button': 'triggerAddBeerForm'
  },

  //adds new model to collection
  triggerAddBeerForm: function(){
    var beer = new beermark.Models.Beer
    beermark.beers.add(beer)
  }
})


//layout view for the list of beers that a brewery makes
beermark.Views.BreweryBeerLayoutView = Marionette.LayoutView.extend({
  tagName: 'div',
  template: breweryBeerLayoutTemplate,
  regions: {
    beerRegion: "#beer-list",
    addBeerRegion: "#add-beer"
  },

  //creates the collection of beers on render of this layout view
  onRender: function() {
    var beer = new beermark.Collections.mBreweryBeers({
            collection: beermark.beers
        });
    this.beerlist = beer.collection.models
    var addBeer = new beermark.Views.BreweryAddBeer();
    this.beerRegion.show(beer);
    this.addBeerRegion.show(addBeer)
  }
});
//templates
var breweryNav = '<div><nav><a href="#"><img src="./imgs/logo.svg"></a><a href="#/brewery/{{name}}/beers">Your Beers</a><a href="#/logout">logout</a></nav></div>'

var breweryInfo = "<div><form method='POST' action='/brewery'><input name='name' value='{{name}}' placeholder='Name'/><img src='{{logo}}'><input name='logo' value='{{logo}}' placeholder='logo url'/><button>Submit</button><form></div>"

//brewery nav
beermark.Views.BreweryNav = Backbone.Marionette.ItemView.extend({
  template: breweryNav
});

//brewery info
beermark.Views.BreweryInfo = Backbone.Marionette.ItemView.extend({
  template: breweryInfo
});



//templates for views
var userNav = '<div><nav><a href="#"><img src="./imgs/logo.svg"></a><a id="search" href="#/search">Find Beer!</a><a href="/user">Your Marks</a><a href="#/user/settings">User Settings</a><a href="#/logout">Logout</a></nav></div>'

var userInfo = "<div><form><input data-input='firstname' value='{{firstname}}'/><input data-input='lastname' value='{{lastname}}'/><input  data-input='email' value='{{email}}'/><button id='submit'>Submit</button></form></div>"

var userSearchLayoutTemplate = "<div id='map'></div><div id='criteria'></div><div id='results'></div>"

var userSearchCriteria = '<form><label>Mile Radius<input name="radius" data-input="radius" placeholder="e.g 3"> Miles</label><label>Brewery Name<input name="brewery_id" data-input="brewery_id" placeholder="e.g. 21st Amendment"></label><label>Beer Name<input name="beer_id" data-input="beer_id" placeholder="e.g Hell Or High Watermelon"></label><button id="search">Search</button></form><!--<div id="results></div>-->"'

//Navigation template
beermark.Views.UserNav = Backbone.Marionette.ItemView.extend({
  template: userNav
});

//View for user info
beermark.Views.UserInfo = Backbone.Marionette.ItemView.extend({
  region: myApp.mainRegion,
  template: userInfo,
  triggers: {
    'click #submit': 'save'
  }
});


//Search criteria section
beermark.Views.UserSearchCriteria = Backbone.Marionette.ItemView.extend({
  //area for results haven't gotten to it yet
  regions: {
        addresses: "#results"
  },
  template: userSearchCriteria,
  events: {
    'click button': 'search'
  },
  search: function (e) {
    e.preventDefault();

    //getting area to put results not done yet
    var results = $('#results')
    results.empty()

    //gets values for the AJAX call to the server
    var currentPosition = marker.getPosition();
    var beer_id = $('input[data-input="beer_id"]').val()
    var brewery_id = $('input[data-input="brewery_id"]').val()
    var radius = $('input[data-input="radius"]').val()

    //ajax call to get relevent information
    $.ajax({
      url: '/venue/beers/search',
      type: "GET",
      dataType: 'json',
      data: {
        brewery_id: brewery_id,
        beer_id: beer_id,
        radius: radius,
        lat: currentPosition.A,
        lng: currentPosition.F
      }
    }).done(function(data) {

      data.forEach(function(e){
        
        //setting google markers on map
        var myLatlng = new google.maps.LatLng(e.pos.x, e.pos.y)
        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: e.name || 'You are here!'
        });

        //appending information to the dom for the venue, marionette docs were down at this time so I made it simply jQuery
        results.append('<div><img class="searchResult" src="' + e.cover_photo + '"><div><b>' + e.name + '</b> ' + e.address + ' <b>' + e.miles + '</b> away</div></div>');
      });
    });
  }
});

//User Seach page layout 
beermark.Views.UserSearchLayoutView = Marionette.LayoutView.extend({
  tagName: 'div',
  template: userSearchLayoutTemplate,
  regions: {
    criteriaRegion: "#criteria"
  },
  onRender: function() {

    //starts the google maps
    function initialize() {
      geocoder = new google.maps.Geocoder();

      //will get the 'default location' of the user and put it in as their location
      geocoder.geocode( { 'address': '2410 28th street, Astoria NY, 11102'}, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {

            //setting lat and long using the results of the geocoder
            var myLatlng = new google.maps.LatLng(results[0].geometry.location.A, results[0].geometry.location.F);
            var mapOptions = {
              zoom: 15,
              center: myLatlng
            }

            //new google maps created and set 
            map = new google.maps.Map(document.getElementById('map'), mapOptions);

            //marker of users location
            marker = new google.maps.Marker({
              draggable:true,
              position: myLatlng,
              map: map,
              title: 'You are here!'
            });
        }
      });
    }

    //initializes the google maps rendering
    initialize();

    //the search criteria part of the search
    var criteria = new beermark.Views.UserSearchCriteria();
    this.criteriaRegion.show(criteria);
  }
});

//templates
venueBeer = "<form><label>Brewery Name<input data-input='breweryname' value='{{breweryname}}'/></label><label>Beer Name<input data-input='beername' value='{{beername}}'/></label><label>Container<input data-input='container' value='{{container}}'/></label><label>Price<input data-input='price' value='{{price}}'/></label><label>Stock<input data-input='stock' value='{{stock}}'/><button class='save'>Save</button><button class='delete'>Delete</button></form>"

venueBeerLayoutTemplate = "<div id='beer-list'></div><div id='add-beer'></div>"

venueBeerAddBeer = "<button id='new-beer-button'>New Beer</button>"


//view for venues beers they have
beermark.Views.VenueBeers = Backbone.Marionette.ItemView.extend({
  template: venueBeer,
  tagName: 'div',
  events: {
    'click .save': 'save',
    'click .delete': 'delete'
  },

  //save function
  save: function(e) {
    e.preventDefault()

    //getting values from form
    var stock = this.$el.find('input[data-input="stock"]').val();
    var breweryname = this.$el.find('input[data-input="breweryname"]').val();
    var beername = this.$el.find('input[data-input="beername"]').val();
    var container = this.$el.find('input[data-input="container"]').val();
    var price = this.$el.find('input[data-input="price"]').val();

    //setting values
    this.model.set({'stock': stock, 'brewery_id': breweryname, 'beer_id': beername, 'container': container, 'price': price});

    //saving model
    this.model.save();
  },

  //deleteing model
  delete: function(e){
    e.preventDefault()
    this.model.destroy();
  }
});

//View for the button on the bottom of the beer list to add beer to the list
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

//layout for venue beer list that holds the collection of beers they have and the add new button
beermark.Views.VenueBeerLayoutView = Marionette.LayoutView.extend({
  tagName: 'div',
  template: venueBeerLayoutTemplate,
  regions: {
    beerRegion: "#beer-list",
    addBeerRegion: "#add-beer"
  },

  //creating instances of the collection of beers and views when this layout view renders
  onRender: function() {
    var beer = new beermark.Collections.mVenueBeers({
            collection: beermark.venueBeers
        });
    this.beerlist = beer.collection.models
    var addBeer = new beermark.Views.VenueBeerAddBeer();
    this.beerRegion.show(beer);
    this.addBeerRegion.show(addBeer)
  }
});
//templates
var venueNav = '<div><nav><a href="#"><img src="./imgs/logo.svg"></a><a href="#/venue/{{name}}/beers">Your Beer!</a><a href="#/logout">Logout</a></nav></div>'

var venueInfo = "<div><form><input data-input='firstname' value='{{firstname}}'/><input data-input='lastname' value='{{lastname}}'/><input  data-input='email' value='{{email}}'/><button id='submit'>Submit</button></form></div>"

//venues nav
beermark.Views.VenueNav = Backbone.Marionette.ItemView.extend({
  template: venueNav
});

//venues information
beermark.Views.VenueInfo = Backbone.Marionette.ItemView.extend({
  template: venueInfo
});



//brewery beer collection
beermark.Collections.bBreweryBeers = Backbone.Collection.extend({
  model: beermark.Models.Beer,
  url: '/beers',
  comparator: 'name',
  initialize: function () {
     this.listenTo(this.collection, 'add', this.render);
  }
})

//marionette collection view for brewery beer collection
beermark.Collections.mBreweryBeers = Marionette.CollectionView.extend({
  childView: beermark.Views.BreweryBeer
});


//venue beer collection
beermark.Collections.bVenueBeers = Backbone.Collection.extend
  ({
  model: beermark.Models.VenueBeers,
  url: '/venue/beers',
  comparator: 'stock',
  initialize: function () {
     this.listenTo(this.collection, 'add', this.render);
  }
});

//mariontte collection view for venue beer collection
beermark.Collections.mVenueBeers = Marionette.CollectionView.extend({
  childView: beermark.Views.VenueBeers
});


//backbone router for main navigation 
var Router = Backbone.Router.extend({

    //backbone routes
    routes: {
      '': 'index',
      'logout': 'logout',
      'user/settings' : 'update',
      'brewery/:breweryName/beers': 'breweryBeers',
      'venue/:venueName/beers': 'venueBeers',
      'search': 'search'
    },

    //index switch case to determine what user is logged in
    index: function (){

      //switch case to determine what html to be served up to what type of user
      switch(beermark.role_id) {

        //case for user 
        case "1":
        var nav = new beermark.Views.UserNav();
        myApp.navigationRegion.show(nav)
        break;

        //case for venue
        case "2":
        var nav = new beermark.Views.VenueNav({
            model: beermark.venue
        });
        myApp.navigationRegion.show(nav)
        var info = new beermark.Views.VenueInfo({
            model: beermark.currentUser
        });
        myApp.mainRegion.show(info)
        break;

        //case for brewery
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

        //this information can be turned into a marionette view
        info.on("save", function(){

            //getting information from form
            var firstname = this.$el.find('input[data-input="firstname"]').val();
            var lastname = this.$el.find('input[data-input="lastname"]').val();
            var email = this.$el.find('input[data-input="email"]').val();

            //setting model info
            this.model.set('firstname', firstname);
            this.model.set('lastname', lastname);
            this.model.set('email', email);

            //saving model
            this.model.save();
        });
    },

    // breweries beers page
    breweryBeers: function (){

        //creating nav
        var nav = new beermark.Views.BreweryNav({
            model: beermark.brewery
        });

        //creating layout view with initiates the other things with in it
        myApp.navigationRegion.show(nav)
        var layout = new beermark.Views.BreweryBeerLayoutView();
        myApp.mainRegion.show(layout)
    },

    //venue beers page
    venueBeers: function (){

        //creating nav
        var nav = new beermark.Views.VenueNav({
            model: beermark.venue
        });

        //creating layout view with initiates the other things with in it
        myApp.navigationRegion.show(nav)
        var layout = new beermark.Views.VenueBeerLayoutView();
        myApp.mainRegion.show(layout)
    },

    //search page
    search: function () {

        //creating nav
        var nav = new beermark.Views.UserNav({
            model: beermark.currentUser
        });

        //creating layout view with initiates the other things with in it
        myApp.navigationRegion.show(nav)
        var search = new beermark.Views.UserSearchLayoutView()
        myApp.mainRegion.show(search)

    }
});

// login servering up right information based on Users Role
switch (beermark.role_id) {
    
    //setting models fetching all info for normal user
    case '1':
    beermark.currentUser = new beermark.Models.User({id: beermark.user_id});
    promise = beermark.currentUser.fetch();
    break;


    //setting models fetching information for venue
    case '2':
    beermark.currentUser = new beermark.Models.User({id: beermark.user_id});
    beermark.currentUser.fetch();
    beermark.venue = new beermark.Models.Venue({id:beermark.user_id});
    promise = beermark.venue.fetch()
    promise.done(function (){
        document.cookie = 'venue_id=' + beermark.venue.id;
    });
    break;
    
    //setting models fetching information for brewery
    case '3':
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
    //needed to make if else statement for venue, couldn't do another fetch with in a promise, had to separate them.
    // 'if' for venues
    if(beermark.venue){

        //fetches venues beer information on success logs in
        beermark.venueBeers = new beermark.Collections.bVenueBeers();
        beermark.venueBeers.fetch()

        //starts router
        var myRouter = new Router();
        Backbone.history.start();

    // else for everything else
    } else {
        
        //starts router
        var myRouter = new Router();
        Backbone.history.start();
    }
});
  
