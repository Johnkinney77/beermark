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