var userNav = '<div><nav><a href="#"><img src="./imgs/logo.svg"></a><a id="search" href="#/search">Find Beer!</a><a href="/user">Your Marks</a><a href="#/user/settings">User Settings</a><a href="#/logout">Logout</a></nav></div>'

var userInfo = "<div><form><input data-input='firstname' value='{{firstname}}'/><input data-input='lastname' value='{{lastname}}'/><input  data-input='email' value='{{email}}'/><button id='submit'>Submit</button></form></div>"

beermark.Views.UserNav = Backbone.Marionette.ItemView.extend({
  template: userNav
});

beermark.Views.UserInfo = Backbone.Marionette.ItemView.extend({
  region: myApp.mainRegion,
  template: userInfo,
  triggers: {
    'click #submit': 'save'
  }
});


