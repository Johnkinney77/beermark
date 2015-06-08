venueBeer = "<form><label>Brewery Name<input data-input='breweryname' value='{{breweryname}}'/></label><label>Beer Name<input data-input='beername' value='{{beername}}'/></label><label>Container<input data-input='container' value='{{container}}'/></label><label>Price<input data-input='price' value='{{price}}'/></label><label>Stock<input data-input='stock' value='{{stock}}'/><button class='save'>Save</button><button class='delete'>Delete</button></form>"

venueBeerLayoutTemplate = "<div id='beer-list'></div><div id='add-beer'></div>"

venueBeerAddBeer = "<button id='new-beer-button'>New Beer</button>"

beermark.Views.VenueBeers = Backbone.Marionette.ItemView.extend({
  template: venueBeer,
  tagName: 'div',
  events: {
    'click .save': 'save',
    'click .delete': 'delete'
  },
  save: function(e) {
    e.preventDefault()
    var stock = this.$el.find('input[data-input="stock"]').val();
    var breweryname = this.$el.find('input[data-input="breweryname"]').val();
    var beername = this.$el.find('input[data-input="beername"]').val();
    var container = this.$el.find('input[data-input="container"]').val();
    var price = this.$el.find('input[data-input="price"]').val();

    this.model.set({'stock': stock, 'brewery_id': breweryname, 'beer_id': beername, 'container': container, 'price': price});
    // this.model.set({'name': name, 'abv': abv, 'season': season, 'style': style, 'yeast': yeast, 'ibu': ibu, 'ebc': ebc, 'aged': aged, 'description': description });
    this.model.save();
  },
  delete: function(e){
    e.preventDefault()
    this.model.destroy();
  }
});

beermark.Views.VenueBeerAddBeer = Backbone.Marionette.ItemView.extend({
  template: venueBeerAddBeer,
  tagName: 'div',
  events: {
    'click #new-beer-button': 'triggerAddBeerForm'
  },
  triggerAddBeerForm: function(){
    var beer = new beermark.Models.VenueBeers
    beermark.venueBeers.add(beer)
  }
})



beermark.Views.VenueBeerLayoutView = Marionette.LayoutView.extend({
  tagName: 'div',
  template: venueBeerLayoutTemplate,
  regions: {
    beerRegion: "#beer-list",
    addBeerRegion: "#add-beer"
  },
  onRender: function() {
    var beer = new beermark.Collections.mVenueBeers({
            collection: beermark.venueBeers
        });
    this.beerlist = beer.collection.models
    var addBeer = new beermark.Views.VenueBeerAddBeer();
    this.beerRegion.show(beer);
    this.addBeerRegion.show(addBeer)
  },
  childEvents: {
    'save:ya': function (e){
      console.log('saved')
      console.log(this.beerlist)
      this.beerlist.each(function(beer) {
        beer.save();
      });
    }
  }
});