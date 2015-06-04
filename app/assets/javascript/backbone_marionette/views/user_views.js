var userNav = '<h1>welcome to User Nav</h1>'

var userInfo = "<form method='POST' action='/brewery'><input name='name' placeholder='Name'/><input name='logo_url' placeholder='logo_url'/><button>Submit</button>"

beermark.Views.UserNav = Backbone.Marionette.ItemView.extend({
  template: userNav
});

beermark.Views.UserInfo = Backbone.Marionette.ItemView.extend({
  template: userInfo
});

