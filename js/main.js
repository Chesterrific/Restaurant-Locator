//Google Services
var map, geocoder, infoWindow, placesService;

//Location Components
var lat, long, startingCoords, range;

//Pagination Components
var getNextPage, moreBtn;

//Marker Components
var homeIcon, markersList;

function init() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 39.8097343, lng: -98.5556199 },
    zoom: 5
  });
  geocoder = new google.maps.Geocoder();
  infoWindow = new google.maps.InfoWindow;
  placesService = new google.maps.places.PlacesService(map);

  getNextPage = null;
  moreBtn = document.getElementById('moreBtn');
  moreBtn.onclick = function () {
    // moreBtn.disabled = true;
    // console.log(getNextPage);
    if (getNextPage) {
      getNextPage.nextPage();
    }
  }

  homeIcon = {
    url: 'http://maps.google.com/mapfiles/kml/shapes/homegardenbusiness.png',
    scaledSize: new google.maps.Size(25,25)
  }
  markersList = [];
}

function searchLoc() {
  startingCoords = null;
  var startLocation = document.getElementById('address').value;
  geocoder.geocode({ 'address': startLocation }, function (results, status) {
    if (status == 'OK') {
      map.setCenter(results[0].geometry.location);

      const marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location,
        icon: homeIcon
      });

      markersList.push(marker);

      setInfoWindowInfo(results[0].geometry.location, results[0].formatted_address);
      startingCoords = results[0].geometry.location;
      infoWindow.open(map);
      closeOverlay();
    } else {
      alert('Geocode was not successful: ' + status);
    }
  });
}

function findCurrentLoc() {
  startingCoords = null;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      geocoder.geocode({ 'location': pos }, function (results, status) {
        if (status == 'OK') {
          const marker = new google.maps.Marker({
            map: map,
            position: pos,
            icon: homeIcon
          });

          setInfoWindowInfo(pos, results[0].formatted_address);
          startingCoords = pos;
          infoWindow.open(map);
        }
      });
      map.setCenter(pos);
      closeOverlay();
    });
  } else {
    alert('Geolocation was not successful');
  }
}

function setInfoWindowInfo(pos, content) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(content);
}

function searchRestaurants() {
  var open = document.getElementsByName('open?');
  var open_value;
  for (var i = 0; i < open.length; i++) {
    if (open[i].checked) {
      open_value = open[i].value;
    }
  }

  var request = {
    location: startingCoords,
    keyword: document.getElementById("foodType").value,
    maxPriceLevel: document.getElementById("prices").value,
    radius: document.getElementById("radius").value / 0.000621371,
    type: ['restaurant']
  };

  placesService.nearbySearch(request, getSearchResults);
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
}

function createMarker(place) {
  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location
  });

  markersList.push(marker);
  google.maps.event.addListener(marker, "click", () => {
    setInfoWindowInfo(place.geometry.location, place.name);
    infoWindow.open(map);
  });
}

function setMapOnAll(map){
  for(var i = 0; i < markersList.length; i++){
    markersList[i].setMap(map);
  }
}

function clearMarkers(){
  setMapOnAll(null);
}

function showMarkers(){
  setMapOnAll(map);
}

function deleteMarkers(){
  clearMarkers();
  markersList = [];
  infoWindow.open(null);
}