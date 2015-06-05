var userNav = '<div><nav><a href="/"><img src="./imgs/logo.svg"></a><a href="#/search">Find Beer!</a><a href="/user">Your Marks</a><a href="#/logout">Logout</a></nav></div>'

var userInfo = "<div><form method='POST' action='/user/{{user_id}}'><input name='firstname' value='{{firstname}}'/><input name='lastname' value='{{lastname}}'/><input name='email' value='{{email}}'/><input name='logo_url' placeholder='logo_url'/><button>Submit</button></form></div>"

beermark.Views.UserNav = Backbone.Marionette.ItemView.extend({
  template: userNav
});

beermark.Views.UserInfo = Backbone.Marionette.ItemView.extend({
  template: userInfo
});

