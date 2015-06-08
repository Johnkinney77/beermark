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
            console.log(results)
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
  
