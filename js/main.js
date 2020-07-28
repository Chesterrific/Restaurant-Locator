//Google Services
var map, geocoder, infoWindow, placesService;

//Location Components
var lat, long, startingCoords, range, bounds;

//Pagination Components
var getNextPage, moreBtn;

//Marker Components
var homeIcon, markersList, homeMarker;

function init() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 39.8097343, lng: -98.5556199 },
    zoom: 5
  });
  geocoder = new google.maps.Geocoder();
  infoWindow = new google.maps.InfoWindow;
  placesService = new google.maps.places.PlacesService(map);
  bounds = new google.maps.LatLngBounds();

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
    scaledSize: new google.maps.Size(25, 25),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(12.5, 12.5)
  }
  markersList = [];
  homeMarker = new google.maps.Marker();
}

function searchLoc() {
  startingCoords = null;
  deleteHomeMarker();
  var startLocation = document.getElementById('address').value;
  geocoder.geocode({ 'address': startLocation }, function (results, status) {
    if (status == 'OK') {
      startingCoords = results[0].geometry.location;

      const marker = new google.maps.Marker({
        map: map,
        position: startingCoords,
        icon: homeIcon
      });

      homeMarker = marker;
      setInfoWindowInfo(startingCoords, results[0].formatted_address);
      infoWindow.open(map);

      google.maps.event.addListener(homeMarker, 'click', () => {
        setInfoWindowInfo(startingCoords, results[0].formatted_address);
        map.panTo(homeMarker.getPostion());
        infoWindow.open(map);
      });

      map.setZoom(10);
      map.setCenter(startingCoords);
      closeOverlay();
    } else {
      alert('Geocode was not successful: ' + status);
    }
  });
}

function findCurrentLoc() {
  startingCoords = null;
  deleteHomeMarker();
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
          map.setCenter(pos);
          map.setZoom(10);

          homeMarker = marker;
          setInfoWindowInfo(pos, results[0].formatted_address);
          infoWindow.open(map);

          google.maps.event.addListener(homeMarker, "click", () => {
            setInfoWindowInfo(pos, results[0].formatted_address);
            map.panTo(homeMarker.getPosition());
            infoWindow.open(map);
          });

          startingCoords = pos;
        }
      });
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
  infoWindow.open(null);
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
    radius: document.getElementById("radius").value / 0.000621371, //Converting from meters to miles.
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

  showMarkers();
}

function createMarker(place) {
  const marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, "click", () => {
    setInfoWindowInfo(place.geometry.location, place.name);
    map.panTo(marker.getPosition());
    infoWindow.open(map);
  });
  bounds.extend(marker.getPosition());
  markersList.push(marker);
}

function setMapOnAll(map) {
  for (var i = 0; i < markersList.length; i++) {
    markersList[i].setMap(map);
  }
}

function clearMarkers() {
  setMapOnAll(null);
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

function deleteHomeMarker() {
  homeMarker.setMap(null);
  homeMarker = null;
}