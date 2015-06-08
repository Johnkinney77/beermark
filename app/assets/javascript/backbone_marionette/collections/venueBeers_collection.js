
//venue beer collection
beermark.Collections.bVenueBeers = Backbone.Collection.extend
  ({
  model: beermark.Models.VenueBeers,
  url: '/venue/beers',
  comparator: 'stock',
  initialize: function () {
     this.listenTo(this.collection, 'add', this.render);
  }
});

//mariontte collection view for venue beer collection
beermark.Collections.mVenueBeers = Marionette.CollectionView.extend({
  childView: beermark.Views.VenueBeers
});