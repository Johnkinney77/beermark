
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
  
