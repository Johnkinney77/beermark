beermark.Collections.bVenueBeers = Backbone.Collection.extend
  ({
  model: beermark.Models.VenueBeers,
  url: '/venue/beers',
  comparator: 'stock',
  initialize: function () {
     this.listenTo(this.collection, 'add', this.render);
  }
})

beermark.Collections.mVenueBeers = Marionette.CollectionView.extend({

  childView: beermark.Views.VenueBeers
});