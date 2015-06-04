var breweryNav = '<h1>welcome to brewery Nav</h1>'

var breweryInfo = "<form method='POST' action='/brewery'><input name='name' placeholder='Name'/><input name='logo_url' placeholder='logo_url'/><button>Submit</button>"

beermark.Views.BreweryNav = Backbone.Marionette.ItemView.extend({
  template: breweryNav
});

beermark.Views.BreweryInfo = Backbone.Marionette.ItemView.extend({
  template: breweryInfo
});

