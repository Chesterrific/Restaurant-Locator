var map, geocoder, infoWindow, placesService;

var lat, long;

var startingCoords, range;

function Init() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 39.8097343, lng: -98.5556199 },
    zoom: 5
  });
  geocoder = new google.maps.Geocoder();
  infoWindow = new google.maps.InfoWindow;
  placesService = new google.maps.places.PlacesService(map);
}

function SearchLoc() {
  var startLocation = document.getElementById('address').value;
  geocoder.geocode({ 'address': startLocation }, function (results, status) {
    if (status == 'OK') {
      map.setCenter(results[0].geometry.location);
      // var marker = new google.maps.Marker({
      //   map: map,
      //   position: results[0].geometry.location
      // });
      SetInfoWindowInfo(results[0].geometry.location, results[0].formatted_address);
      startingCoords = results[0].geometry.location;
      infoWindow.open(map);
      CloseOverlay();
    } else {
      alert('Geocode was not successful: ' + status);
    }
  });
}

function FindCurrentLoc() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      geocoder.geocode({ 'location': pos }, function (results, status) {
        if (status == 'OK') {
          SetInfoWindowInfo(pos, results[0].formatted_address);
          startingCoords = pos;
          infoWindow.open(map);
        }
      });
      map.setCenter(pos);
      CloseOverlay();
    });
  } else {
    alert('Geolocation was not successful');
  }
}

function SetInfoWindowInfo(pos, content) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(content);
}

function SearchRestaurants() {
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
    openNow: open_value,
    maxPriceLevel: document.getElementById("prices").value,
    rankBy: google.maps.places.RankBy.DISTANCE,
    type: ['restaurant']
  };

  placesService.nearbySearch(request, GetResults);
}

function GetResults(results, status) {
  console.log(status);
  console.log(results.length);
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location
  });
  google.maps.event.addListener(marker, "click", () => {
    SetInfoWindowInfo(place.geometry.location, place.name);
    infoWindow.open(map);
  });
}