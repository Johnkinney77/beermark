
beermark.Views.MainView = Backbone.Marionette.LayoutView.extend({
  userTemplate: "#userMain",
  venueTemplate: "#venueMain",
  breweryTemplate: "#breweryMain",
  appendHtml: function(){
    if (beermark.user_id === "1") {
      console.log('user');
    } else if (beermark.user_id === "2") {
    console.log('venue');
    } else if (beermark.user_id === "3") {
    console.log('brewery');
    } else {
    console.log('not a user');
    }
    
  }
});


beermark.Views.UserMain = Backbone.Marionette.ItemView.extend({
  template: $("#userMain")
});
var mainView = new beermark.Views.MainView()

mainView.addRegions({
    navigation: "#navigation",
    main: "#main",
    newBeer: "#new-beer",
    suggestedBeer: "#suggested-beer",
  })