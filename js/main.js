//Google Services
var map, geocoder, infoWindow, placesService;

//Location Components
var lat, long, startingCoords, range, bounds, findCurrLocBtn, searchLocBtn;

//Pagination Components
var getNextPage, moreBtn;

//Marker Components
var homeIcon, markersList, homeMarker;

//Results Array
const restaurantResults = [];

function init() {
  // Initialize Google components.
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 39.8097343, lng: -98.5556199 },
    zoom: 5
  });
  geocoder = new google.maps.Geocoder();
  infoWindow = new google.maps.InfoWindow;
  placesService = new google.maps.places.PlacesService(map);
  bounds = new google.maps.LatLngBounds();

  // Initialize Results components.
  getNextPage = null;
  moreBtn = document.getElementById('moreBtn');
  moreBtn.onclick = function () {
    // moreBtn.disabled = true;
    // console.log(getNextPage);
    if (getNextPage) {
      getNextPage.nextPage();
    }
  }

  // Initialize Marker components.
  homeIcon = {
    url: 'http://maps.google.com/mapfiles/kml/shapes/homegardenbusiness.png',
    scaledSize: new google.maps.Size(25, 25),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(12.5, 12.5)
  }
  markersList = [];
  homeMarker = new google.maps.Marker();

  // Add event listeners to buttons.
  findCurrLocBtn = document.getElementById('findCurrLocBtn').addEventListener('click', function () {
    findStartLoc()
      .then(setHomeMarker)
      .catch(err => alert('Geolocation was not successful: ' + err));
  });

  searchLocBtn = document.getElementById('searchLocBtn').addEventListener('click', function () {
    findStartLoc(document.getElementById('address').value)
      .then(setHomeMarker)
      .catch(err => alert('Geocoding was not successful: ' + err));
  });
}

function findStartLoc(givenAddress = null) {
  startingCoords = null;
  let formattedAddress = null;
  deleteHomeMarker();
  deleteMarkers();

  return new Promise((resolve, reject) => {
    if (!givenAddress) { //If not given address, geolocate current position.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          geocoder.geocode({ 'location': pos }, function (results, status) {
            if (status == 'OK') {
              startingCoords = pos;
              formattedAddress = results[0].formatted_address;
              resolve(formattedAddress);
            } else {
              reject(status);
            }
          });
        });
      } else {
        alert('Geolocation was not successful.');
        reject(status);
      }
    } else { //Use given address to geocode current position.
      geocoder.geocode({ 'address': givenAddress }, function (results, status) {
        if (status == 'OK') {
          startingCoords = results[0].geometry.location;
          formattedAddress = results[0].formatted_address;
          resolve(formattedAddress);
        } else {
          reject(status);
        }
      });
    }
  });
}

function setInfoWindowInfo(pos, content) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(content);
}

function searchRestaurants() {
  deleteMarkers();

  var request = {
    location: startingCoords,
    keyword: document.getElementById("foodType").value,
    maxPriceLevel: document.getElementById("prices").value,
    radius: document.getElementById("radius").value / 0.000621371, //Converting from meters to miles.
    type: ['restaurant']
  };

  placesService.nearbySearch(request, getSearchResults);

  openResults();
}

function getSearchResults(results, status, pagination) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
    console.log(pagination.hasNextPage);
    moreBtn.disabled = !pagination.hasNextPage;

    if (pagination.hasNextPage) {
      getNextPage = pagination;
    }
  }
  showMarkers();
}
// Home Marker functions
function setHomeMarker(formattedAddress) {
  if (formattedAddress) {
    const marker = new google.maps.Marker({
      map: map,
      position: startingCoords,
      icon: homeIcon
    });

    homeMarker = marker;
    setInfoWindowInfo(startingCoords, formattedAddress);
    infoWindow.open(map);

    google.maps.event.addListener(homeMarker, 'click', () => {
      setInfoWindowInfo(startingCoords, formattedAddress);
      infoWindow.open(map);
    });

    map.setCenter(startingCoords);
    map.setZoom(10);
    closeOverlay();
  }
}

function deleteHomeMarker() {
  homeMarker.setMap(null);
  homeMarker = new google.maps.Marker();
}

// General Marker functions
function createMarker(place) {
  const marker = new google.maps.Marker({
    position: place.geometry.location
  });

  // Create map marker
  google.maps.event.addListener(marker, "click", () => {
    setInfoWindowInfo(place.geometry.location, place.name);
    map.panTo(marker.getPosition());
    infoWindow.open(map);
  });
  bounds.extend(marker.getPosition());
  markersList.push(marker);

  // Create result listing
  var ul = document.getElementById('resultsList');
  var li = document.createElement('li');
  li.appendChild(document.createTextNode(place.name));
  ul.appendChild(li);

  // 
  li.addEventListener('click', () => {
    setInfoWindowInfo(place.geometry.location, place.name);
    map.panTo(marker.getPosition());
    infoWindow.open(map);
  });
}

function setMapOnAll(map) {
  for (var i = 0; i < markersList.length; i++) {
    markersList[i].setMap(map);
  }
}

function clearMarkers() {
  setMapOnAll(null);
  $('#resultsList').empty();
}

function showMarkers() {
  setMapOnAll(map);
  map.fitBounds(bounds);
}

function deleteMarkers() {
  clearMarkers();
  markersList = [];
  infoWindow.open(null);
}

// Results page functions


