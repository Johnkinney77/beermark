//templates for views
var userNav = '<div><nav><a href="#"><img src="./imgs/logo.svg"></a><a id="search" href="#/search">Find Beer!</a><a href="/user">Your Marks</a><a href="#/user/settings">User Settings</a><a href="#/logout">Logout</a></nav></div>'

var userInfo = "<div><form><input data-input='firstname' value='{{firstname}}'/><input data-input='lastname' value='{{lastname}}'/><input  data-input='email' value='{{email}}'/><button id='submit'>Submit</button></form></div>"

var userSearchLayoutTemplate = "<div id='map'></div><div id='criteria'></div><div id='results'></div>"

var userSearchCriteria = '<form><label>Mile Radius<input name="radius" data-input="radius" placeholder="e.g 3"> Miles</label><label>Brewery Name<input name="brewery_id" data-input="brewery_id" placeholder="e.g. 21st Amendment"></label><label>Beer Name<input name="beer_id" data-input="beer_id" placeholder="e.g Hell Or High Watermelon"></label><button id="search">Search</button></form><!--<div id="results></div>-->"'

//Navigation template
beermark.Views.UserNav = Backbone.Marionette.ItemView.extend({
  template: userNav
});

//View for user info
beermark.Views.UserInfo = Backbone.Marionette.ItemView.extend({
  region: myApp.mainRegion,
  template: userInfo,
  triggers: {
    'click #submit': 'save'
  }
});


//Search criteria section
beermark.Views.UserSearchCriteria = Backbone.Marionette.ItemView.extend({
  //area for results haven't gotten to it yet
  regions: {
        addresses: "#results"
  },
  template: userSearchCriteria,
  events: {
    'click button': 'search'
  },
  search: function (e) {
    e.preventDefault();

    //getting area to put results not done yet
    var results = $('#results')
    results.empty()

    //gets values for the AJAX call to the server
    var currentPosition = marker.getPosition();
    var beer_id = $('input[data-input="beer_id"]').val()
    var brewery_id = $('input[data-input="brewery_id"]').val()
    var radius = $('input[data-input="radius"]').val()

    //ajax call to get relevent information
    $.ajax({
      url: '/venue/beers/search',
      type: "GET",
      dataType: 'json',
      data: {
        brewery_id: brewery_id,
        beer_id: beer_id,
        radius: radius,
        lat: currentPosition.A,
        lng: currentPosition.F
      }
    }).done(function(data) {

      data.forEach(function(e){
        
        //setting google markers on map
        var myLatlng = new google.maps.LatLng(e.pos.x, e.pos.y)
        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: e.name || 'You are here!'
        });

        //appending information to the dom for the venue, marionette docs were down at this time so I made it simply jQuery
        results.append('<div><img class="searchResult" src="' + e.cover_photo + '"><div><b>' + e.name + '</b> ' + e.address + ' <b>' + e.miles + '</b> away</div></div>');
      });
    });
  }
});

//User Seach page layout 
beermark.Views.UserSearchLayoutView = Marionette.LayoutView.extend({
  tagName: 'div',
  template: userSearchLayoutTemplate,
  regions: {
    criteriaRegion: "#criteria"
  },
  onRender: function() {

    //starts the google maps
    function initialize() {
      geocoder = new google.maps.Geocoder();

      //will get the 'default location' of the user and put it in as their location
      geocoder.geocode( { 'address': '2410 28th street, Astoria NY, 11102'}, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {

            //setting lat and long using the results of the geocoder
            var myLatlng = new google.maps.LatLng(results[0].geometry.location.A, results[0].geometry.location.F);
            var mapOptions = {
              zoom: 15,
              center: myLatlng
            }

            //new google maps created and set 
            map = new google.maps.Map(document.getElementById('map'), mapOptions);

            //marker of users location
            marker = new google.maps.Marker({
              draggable:true,
              position: myLatlng,
              map: map,
              title: 'You are here!'
            });
        }
      });
    }

    //initializes the google maps rendering
    initialize();

    //the search criteria part of the search
    var criteria = new beermark.Views.UserSearchCriteria();
    this.criteriaRegion.show(criteria);
  }
});
