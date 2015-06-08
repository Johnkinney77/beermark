//brewery beer collection
beermark.Collections.bBreweryBeers = Backbone.Collection.extend({
  model: beermark.Models.Beer,
  url: '/beers',
  comparator: 'name',
  initialize: function () {
     this.listenTo(this.collection, 'add', this.render);
  }
})

//marionette collection view for brewery beer collection
beermark.Collections.mBreweryBeers = Marionette.CollectionView.extend({
  childView: beermark.Views.BreweryBeer
});