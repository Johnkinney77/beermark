var beermark = beermark || { Models: {}, Collection: {}, Views: {} };
beermark.user_id = document.cookie.replace("cokkieName=", "");

myApp = new Backbone.Marionette.Application();


myApp.addRegions({
  mainRegion: "body"
})

beermark.Models.Beer = Backbone.Model.extend({
  rootURL: "/beer"
});
beermark.Models.Brewery = Backbone.Model.extend({
  urlRoot: '/brewery'
});
// beermark.on('start', function() {
//   Backbone.history.start();
// });
// beermark = beermark || { Models: {}, Collection: {} };




beermark.Views.MainView = Backbone.Marionette.LayoutView.extend({
  userTemplate: "#userMain",
  venueTemplate: "#venueMain",
  breweryTemplate: "#breweryMain",
  appendHtml: function(){
    if (beermark.user_id === "1") {
      console.log('user');
    } else if (beermark.user_id === "2") {
    console.log('venue');
    } else if (beermark.user_id === "3") {
    console.log('brewery');
    } else {
    console.log('not a user');
    }
    
  }
});


beermark.Views.UserMain = Backbone.Marionette.ItemView.extend({
  template: $("#userMain")
});
var mainView = new beermark.Views.MainView()

mainView.addRegions({
    navigation: "#navigation",
    main: "#main",
    newBeer: "#new-beer",
    suggestedBeer: "#suggested-beer",
  })