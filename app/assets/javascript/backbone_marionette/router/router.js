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
  
  
