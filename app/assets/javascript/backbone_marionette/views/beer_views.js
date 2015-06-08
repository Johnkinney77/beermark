//templates
beer = "<form><label>Name<input data-input='name' value='{{name}}'/></label><label>ABV<input data-input='abv' value='{{abv}}'/></label><label>Season<input data-input='season' value='{{season}}'/></label><label>Style<input data-input='style' value='{{style}}'/></label><label>Yeast<input data-input='yeast' value='{{yeast}}'/></label><label>IBU<input data-input='ibu' value='{{ibu}}'/></label><label>EBC<input data-input='ebc' value='{{ebc}}'/></label><label>Aged<input data-input='aged' value='{{aged}}'/></label><label>Beer Description<textarea data-input='description'>{{description}}</textarea></label><button class='save'>Save</button><button class='delete'>Delete</button></form>"

breweryBeerLayoutTemplate = "<div id='beer-list'></div><div id='add-beer'></div>"

breweryAddBeer = "<button id='new-beer-button'>New Beer</button>"

//View for a single beer
beermark.Views.BreweryBeer = Backbone.Marionette.ItemView.extend({
  template: beer,
  tagName: 'div',
  events: {
    'click .save': 'save',
    'click .delete': 'delete'
  },

  //save event
  save: function(e) {
    e.preventDefault()

    //getting information from form
    var name = this.$el.find('input[data-input="name"]').val();
    var abv = this.$el.find('input[data-input="abv"]').val();
    var season = this.$el.find('input[data-input="season"]').val();
    var style = this.$el.find('input[data-input="style"]').val();
    var yeast = this.$el.find('input[data-input="yeast"]').val();
    var ibu = this.$el.find('input[data-input="ibu"]').val();
    var ebc = this.$el.find('input[data-input="ebc"]').val();
    var aged = this.$el.find('input[data-input="aged"]').val();
    var description = this.$el.find('textarea[data-input="description"]').val();

    //setting model information
    this.model.set({'name': name, 'abv': abv, 'season': season, 'style': style, 'yeast': yeast, 'ibu': ibu, 'ebc': ebc, 'aged': aged, 'description': description });

    //saving model
    this.model.save();
  },

  //deleteing beer
  delete: function(e){
    e.preventDefault()
    this.model.destroy();
  }
});

//View for the add beer button
beermark.Views.BreweryAddBeer = Backbone.Marionette.ItemView.extend({
  template: breweryAddBeer,
  tagName: 'div',
  events: {
    'click #new-beer-button': 'triggerAddBeerForm'
  },

  //adds new model to collection
  triggerAddBeerForm: function(){
    var beer = new beermark.Models.Beer
    beermark.beers.add(beer)
  }
})


//layout view for the list of beers that a brewery makes
beermark.Views.BreweryBeerLayoutView = Marionette.LayoutView.extend({
  tagName: 'div',
  template: breweryBeerLayoutTemplate,
  regions: {
    beerRegion: "#beer-list",
    addBeerRegion: "#add-beer"
  },

  //creates the collection of beers on render of this layout view
  onRender: function() {
    var beer = new beermark.Collections.mBreweryBeers({
            collection: beermark.beers
        });
    this.beerlist = beer.collection.models
    var addBeer = new beermark.Views.BreweryAddBeer();
    this.beerRegion.show(beer);
    this.addBeerRegion.show(addBeer)
  }
});