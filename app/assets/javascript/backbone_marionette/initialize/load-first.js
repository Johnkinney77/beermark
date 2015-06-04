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