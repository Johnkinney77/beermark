var venueNav = '<h1>welcome to Venue Nav</h1>'

var venueInfo = "<form method='POST' action='/brewery'><input name='name' placeholder='Name'/><input name='logo_url' placeholder='logo_url'/><button>Submit</button>"

beermark.Views.VenueNav = Backbone.Marionette.ItemView.extend({
  template: venueNav
});

beermark.Views.VenueInfo = Backbone.Marionette.ItemView.extend({
  template: venueInfo
});

