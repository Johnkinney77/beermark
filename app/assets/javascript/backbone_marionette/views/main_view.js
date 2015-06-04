
// MainView = Backbone.Marionette.LayoutView.extend({
//   template: '#maintemplate',
//   appendHtml: function(){
//     if (beermark.user_id === "1") {
//       console.log('user');
//     } else if (beermark.user_id === "2") {
//     console.log('venue');
//     } else if (beermark.user_id === "3") {
//     console.log('brewery');
//     } else {
//     console.log('not a user');
//     }
    
//   }
// });


// beermark.Views.UserMain = Backbone.Marionette.ItemView.extend({
//   template: $("#userMain")
// });

// var layoutView = new MainView();

// var userView = new beermark.Views.UserMain();

// layoutView.addRegions({
//     navigationRegion: "#navigation",
//     mainRegion: "#main",
//     newBeerRegion: "#new-beer",
//     suggestedBeerRegion: "#suggested-beer",
//   })