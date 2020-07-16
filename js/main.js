var map, geocoder;

var lat, long;

function init() {
  geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 39.8097343, lng: -98.5556199 },
    zoom: 5
  });
}

function findCurrentLoc() {
  var startLocation = document.getElementById('address').value;
  geocoder.geocode({ 'address': startLocation }, function (results, status) {
    if (status == 'OK') {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful: ' + status);
    }
  });
}