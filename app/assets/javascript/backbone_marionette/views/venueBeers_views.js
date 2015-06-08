//templates
venueBeer = "<form><label>Brewery Name<input data-input='breweryname' value='{{breweryname}}'/></label><label>Beer Name<input data-input='beername' value='{{beername}}'/></label><label>Container<input data-input='container' value='{{container}}'/></label><label>Price<input data-input='price' value='{{price}}'/></label><label>Stock<input data-input='stock' value='{{stock}}'/><button class='save'>Save</button><button class='delete'>Delete</button></form>"

venueBeerLayoutTemplate = "<div id='beer-list'></div><div id='add-beer'></div>"

venueBeerAddBeer = "<button id='new-beer-button'>New Beer</button>"


//view for venues beers they have
beermark.Views.VenueBeers = Backbone.Marionette.ItemView.extend({
  template: venueBeer,
  tagName: 'div',
  events: {
    'click .save': 'save',
    'click .delete': 'delete'
  },

  //save function
  save: function(e) {
    e.preventDefault()

    //getting values from form
    var stock = this.$el.find('input[data-input="stock"]').val();
    var breweryname = this.$el.find('input[data-input="breweryname"]').val();
    var beername = this.$el.find('input[data-input="beername"]').val();
    var container = this.$el.find('input[data-input="container"]').val();
    var price = this.$el.find('input[data-input="price"]').val();

    //setting values
    this.model.set({'stock': stock, 'brewery_id': breweryname, 'beer_id': beername, 'container': container, 'price': price});

    //saving model
    this.model.save();
  },

  //deleteing model
  delete: function(e){
    e.preventDefault()
    this.model.destroy();
  }
});

//View for the button on the bottom of the beer list to add beer to the list
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

//layout for venue beer list that holds the collection of beers they have and the add new button
beermark.Views.VenueBeerLayoutView = Marionette.LayoutView.extend({
  tagName: 'div',
  template: venueBeerLayoutTemplate,
  regions: {
    beerRegion: "#beer-list",
    addBeerRegion: "#add-beer"
  },

  //creating instances of the collection of beers and views when this layout view renders
  onRender: function() {
    var beer = new beermark.Collections.mVenueBeers({
            collection: beermark.venueBeers
        });
    this.beerlist = beer.collection.models
    var addBeer = new beermark.Views.VenueBeerAddBeer();
    this.beerRegion.show(beer);
    this.addBeerRegion.show(addBeer)
  }
});