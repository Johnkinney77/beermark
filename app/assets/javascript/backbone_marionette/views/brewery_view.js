var breweryNav = '<div><nav><a href="/logout">logout</a></nav></div>'

var breweryInfo = "<div><form method='POST' action='/brewery'><input name='name' placeholder='Name'/><input name='logo_url' placeholder='logo_url'/><button>Submit</button><form></div>"

beermark.Views.BreweryNav = Backbone.Marionette.ItemView.extend({
  template: breweryNav
});

beermark.Views.BreweryInfo = Backbone.Marionette.ItemView.extend({
  onBeforeRender: function(){
    
  },
  template: breweryInfo
});

