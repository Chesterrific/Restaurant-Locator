var map, geocoder, infoWindow;

var lat, long;

function Init() {
  geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 39.8097343, lng: -98.5556199 },
    zoom: 5
  });
  infoWindow = new google.maps.InfoWindow;
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
      infoWindow.open(map);
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
      geocoder.geocode({ 'location': pos }, function (results, status){
        if(status == 'OK'){
          SetInfoWindowInfo(pos, results[0].formatted_address);
          infoWindow.open(map);
        }
      });
      map.setCenter(pos);
    });
  } else {
    alert('Geolocation was not successful');
  }
}

function SetInfoWindowInfo(pos, content) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(content);
}

function CloseOverlay(){
 document.getElementById('overlay').style.height = "0%"
}