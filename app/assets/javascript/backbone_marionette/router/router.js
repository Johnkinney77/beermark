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
