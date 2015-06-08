//templates
var breweryNav = '<div><nav><a href="#"><img src="./imgs/logo.svg"></a><a href="#/brewery/{{name}}/beers">Your Beers</a><a href="#/logout">logout</a></nav></div>'

var breweryInfo = "<div><form method='POST' action='/brewery'><input name='name' value='{{name}}' placeholder='Name'/><img src='{{logo}}'><input name='logo' value='{{logo}}' placeholder='logo url'/><button>Submit</button><form></div>"

//brewery nav
beermark.Views.BreweryNav = Backbone.Marionette.ItemView.extend({
  template: breweryNav
});

//brewery info
beermark.Views.BreweryInfo = Backbone.Marionette.ItemView.extend({
  template: breweryInfo
});


