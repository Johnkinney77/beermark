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


