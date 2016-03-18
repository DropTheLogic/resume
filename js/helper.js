/*
These are HTML strings. As part of the course, you'll be using JavaScript functions
replace the %data% placeholder text you see in them.
*/
var HTMLheaderName = '<h1 id="name">%data%</h1>';
var HTMLheaderRole = '<div class="role">%data%</div><hr/>';

var HTMLcontactGeneric = '<li class="flex-item"><span class="accent-text">%contact%</span><span class="strong-text">%data%</span></li>';
var HTMLmobile = '<li class="flex-item"><span class="accent-text">mobile</span><span class="strong-text">%data%</span></li>';
var HTMLemail = '<li class="flex-item"><span class="accent-text">email</span><span class="strong-text"><a href=mailto:%data%>%data%</a></span></li>';
var HTMLtwitter = '<li class="flex-item"><span class="accent-text">twitter</span><span class="strong-text"><a href="https://www.twitter.com/%data%/" target="blank">%data%</a></span></li>';
var HTMLgithub = '<li class="flex-item"><span class="accent-text">github</span><span class="strong-text"><a href="https://www.github.com/%data%/" target="blank">%data%</a></span></li>';
var HTMLlinkedIn = '<li class="flex-item"><span class="accent-text">linkedin</span><span class="strong-text"><a href="https://www.linkedin.com/in/%data%/" target="blank">%data%</a></span></li>';
var HTMLblog = '<li class="flex-item"><span class="accent-text">blog</span><span class="strong-text">%data%</span></li>';
var HTMLlocation = '<li class="flex-item"><span class="accent-text">location</span><span class="strong-text">%data%</span></li>';

var HTMLbioPic = '<hr/><div class="col-biopic"><img src="%data%" class="biopic add-shadow"></div>';
var HTMLwelcomeMsg = '<span class="welcome-message">%data%</span>';

var HTMLskillsStart = '<div class="col-skills"><h3 id="skills-h3">Skills at a Glance:</h3><ul id="skills"></ul></div>';
var HTMLskills = '<li class="flex-item"><span class="strong-text">* %data%</span></li>';

var HTMLworkStart = '<div class="work-entry"></div>';
var HTMLworkEmployer = '<a href="%url%" target="blank">%data%';
var HTMLworkTitle = ' - %data%</a>';
var HTMLworkDates = '<div class="date-text">%data%</div>';
var HTMLworkLocation = '<div class="location-text">%data%</div>';
var HTMLworkDescription = '<li class="flex-item">* %data%</li>';

var HTMLprojectStart = '<div class="flex-item project-entry"></div>';
var HTMLprojectTitle = '<a href="%url%" target="blank">%data%</a>';
var HTMLprojectDates = '<div class="date-text">%data%</div>';
var HTMLprojectDescription = '<p><br>%data%</p>';
var HTMLprojectImage = '<img src="%data%">';

var HTMLschools = '<h3>Schooling</h3>';
var HTMLschoolStart = '<div class="education-entry"></div>';
var HTMLschoolName = '<h5><a href="%url%" target="blank">%data%</a></h5>';
var HTMLschoolDates = '<div class="date-text">%data%</div>';
var HTMLschoolDegree = '<div class="date-text"> -- %data%</div>';
var HTMLschoolLocation = '<div class="location-text">%data%</div>';
var HTMLschoolMajor = '<em><br>Major: %data%</em>';

var HTMLonlineClasses = '<h3>Online Classes</h3>';
var HTMLonlineTitle = '<a href="%url%" target="blank">%data%';
var HTMLonlineSchool = ' - %data%</a>';
var HTMLonlineDates = '<div class="date-text">%data%</div>';
var HTMLonlineURL = '<br><a href="%url%" target="blank">%data%</a>';

var internationalizeButton = '<button>Internationalize</button>';
var googleMap = '<div id="map"></div>';

var HTMLfooterContactGeneric = '<li class="flex-item"><span>%contact%</span><span class="foot-contact">%data%</span></li>';
var HTMLfooterMobile = '<li class="flex-item"><span>mobile</span><span class="foot-contact">%data%</span></li>';
var HTMLfooterEmail = '<li class="flex-item"><span>email</span><span class="foot-contact"><a href=mailto:%data%>%data%</a></span></li>';
var HTMLfooterTwitter = '<li class="flex-item"><span>twitter</span><span class="foot-contact"><a href="https://www.twitter.com/%data%/" target="blank">%data%</a></span></li>';
var HTMLfooterLinkedIn = '<li class="flex-item"><span>linkedin</span><span class="foot-contact"><a href="https://www.linkedin.com/in/%data%/" target="blank">%data%</a></span></li>';
var HTMLfooterGithub = '<li class="flex-item"><span>github</span><span class="foot-contact"><a href="https://www.github.com/%data%/" target="blank">%data%</a></span></li>';
var HTMLfooterBlog = '<li class="flex-item"><span>blog</span><span class="foot-contact">%data%</span></li>';

/*
The International Name challenge in Lesson 2 where you'll create a function that will need this helper code to run. Don't delete! It hooks up your code to the button you'll be appending.
*/
$(document).ready(function() {
  $('button').click(function() {
    var iName = inName() || function(){};
    $('#name').html(iName);
  });
});

/*
The next few lines about clicks are for the Collecting Click Locations quiz in Lesson 2.
*/
clickLocations = [];

function logClicks(x,y) {
  clickLocations.push(
    {
      x: x,
      y: y
    }
  );
  //console.log('x location: ' + x + '; y location: ' + y);
}

$(document).click(function(loc) {
  // your code goes here!
  var x = loc.pageX;
  var y = loc.pageY;
  logClicks(x,y);
});



/*
This is the fun part. Here's where we generate the custom Google Map for the website.
See the documentation below for more details.
https://developers.google.com/maps/documentation/javascript/reference
*/
var map;    // declares a global map variable
var gInfoWindow; // declares a global info window variable (global, to prevent multiple windows)

/*
Start here! initializeMap() is called when page is loaded.
*/
function initializeMap() {

  var locations;

  var mapOptions = {
    disableDefaultUI: true
  };

  /*
  For the map to be displayed, the googleMap var must be
  appended to #mapDiv in resumeBuilder.js.
  */
  map = new google.maps.Map(document.querySelector('#map'), mapOptions);

  /*
  locationFinder() returns an array of every location string from the JSONs
  written for bio, education, and work.
  */
  function locationFinder() {

    // initializes an empty array
    var locations = [];

    // adds the single location property from bio to the locations object array
    locations.push({
      location: bio.contacts.location,
      description: 'Home'
    });

    // iterates through school locations and appends each location to
    // the locations object array
    for (var school in education.schools) {
      locations.push({
        location: education.schools[school].location,
        description: education.schools[school].name
      });
    }

    // iterates through work locations and appends each location to
    // the locations object array
    for (var job in work.jobs) {
      locations.push({
        location: work.jobs[job].location,
        description: work.jobs[job].employer
      });
    }

    return locations;
  }

  // returns a description for a given name, based on locations
  function getDescription(locations, name) {
    var description = 'Location';
    for (var i = 0; i < locations.length; i++) {
      // Check beginning of string (due to the potential of google
      // to format the end of the location string
      if (locations[i].location.substring(0, 6) == name.substring(0, 6)) {
        description = locations[i].description;
      }
   }
    return description;
  }

  /*
  createMapMarker(placeData) reads Google Places search results to create map pins.
  placeData is the object returned from search results containing information
  about a single location.
  */
  function createMapMarker(placeData) {

    // The next lines save location data from the search result object to local variables
    var lat = placeData.geometry.location.lat();  // latitude from the place service
    var lon = placeData.geometry.location.lng();  // longitude from the place service
    var name = placeData.formatted_address;   // name of the place from the place service
    var bounds = window.mapBounds;            // current boundaries of the map window

    // marker is an object with additional data about the pin for a single location
    var marker = new google.maps.Marker({
      map: map,
      position: placeData.geometry.location,
      title: name
    });

    // infoWindows are the little helper windows that open when you click
    // or hover over a pin on a map. They usually contain more information
    // about a location.
    gInfoWindow = new google.maps.InfoWindow({
      content: name
    });

    // Pop open info window
    google.maps.event.addListener(marker, 'click', function() {
      // First, close old info window
      gInfoWindow.close();

      // Then make new window
      gInfoWindow = new google.maps.InfoWindow({
        content: '<h3>' + getDescription(locations, name) + '</h3>' +
          '<hr /><div>' + name + '<div>'
      });
      gInfoWindow.open(map, marker);
    });

    // this is where the pin actually gets added to the map.
    // bounds.extend() takes in a map location object
    bounds.extend(new google.maps.LatLng(lat, lon));
    // fit the map to the new marker
    map.fitBounds(bounds);
    // center the map
    map.setCenter(bounds.getCenter());
  }

  /*
  callback(results, status) makes sure the search returned results for a location.
  If so, it creates a new map marker for that location.
  */
  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      createMapMarker(results[0]);
    }
  }

  /*
  pinPoster(locations) takes in the array of locations created by locationFinder()
  and fires off Google place searches for each location
  */
  function pinPoster(locations) {

    // creates a Google place search service object. PlacesService does the work of
    // actually searching for location data.
    var service = new google.maps.places.PlacesService(map);

    // Iterates through the array of locations, creates a search object for each location
    for (var place in locations) {

      // the search request object
      var request = {
        query: locations[place].location
      };

      // Actually searches the Google Maps API for location data and runs the callback
      // function with the search results after each search.
      service.textSearch(request, callback);
    }
  }

  // Sets the boundaries of the map based on pin locations
  window.mapBounds = new google.maps.LatLngBounds();

  // locations is an array of location strings returned from locationFinder()
  locations = locationFinder();

  // pinPoster(locations) creates pins on the map for each location in
  // the locations array
  pinPoster(locations);

}

/*
Uncomment the code below when you're ready to implement a Google Map!
*/

// Calls the initializeMap() function when the page loads
window.addEventListener('load', initializeMap);

// Vanilla JS way to listen for resizing of the window
// and adjust map bounds
window.addEventListener('resize', function(e) {
  //Make sure the map bounds get updated on page resize
  map.fitBounds(mapBounds);
});