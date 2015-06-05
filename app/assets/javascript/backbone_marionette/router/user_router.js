var UserRouter = Backbone.Router.extend({


});

beermark.currentUser = new beermark.Models.User()
beermark.currentUser.fetch()
 
// $(function(){
// $.ajax({
//   url: '/user/' + beermark.user_id,
//   type: "GET"
// }).done(function (data){
//   beermark.currentUser = data.rows[0]
  var myRouter = new Router();
  Backbone.history.start();
// });
// });
 
