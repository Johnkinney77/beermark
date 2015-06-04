var beermark = beermark || { Models: {}, Collection: {}, Views: {} };
beermark.user_id = document.cookie.replace("cokkieName=", "");

myApp = new Backbone.Marionette.Application();


myApp.addRegions({
  mainRegion: "body"
})
