<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Restaurant Locator | Welcome</title>
  <link rel="stylesheet" href="css/style.css">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
  <script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
</head>

<body>
  <section id="mapHolder">
    <div id="map"></div>
  </section>

  <section id="overlay">
    <div id="overlayContent">
      <h1 class="centered">Random Restaurant Locator</h1>
      <button class="locateBtn" onclick="findCurrentLoc()">Use Current Location</button>
      <div id="searchTab">
        <input id="address" type="text">
        <button class="locateBtn" onclick="searchLoc()">Search</button>
      </div>
      <a class="centered" id="closeOverlayBtn" onclick="closeOverlay()">^</a>
    </div>
  </section>

  <section id="results">
    <h2 id="title">Search Criteria</h2>
    <ul id="criteria">
      <li class="option">Food Type: <input type="text" id="foodType" value="Burgers"></li>
      <li class="option">Search Radius (Miles): <input type="text" id="radius" value="5"></li>
      <li class="option" id="priceRange">Max Price Range:
        <select name="prices" id="prices">
          <option value="1">$ (Least Expensive)</option>
          <option value="2">$$</option>
          <option value="3">$$$</option>
          <option value="4">$$$$ (Most Expensive)</option>
        </select>
      </li>
    </ul>
    <button onclick="searchRestaurants()">Begin Search</button>
    <button id="moreBtn">More Results</button>
    <button id="openOverlayBtn" onclick="openOverlay()">New Starting Position</button>
    <button id="clearMarkers" onclick="deleteMarkers()">Clear Markers</button>
  </section>

  <script src="js/main.js"></script>
  <script src="js/style.js"></script>

  <!-- <script async defer src="https://maps.googleapis.com/maps/api/js?key=&libraries=places&callback=init"></script> -->

  <?php
  include 'dbconn.php';
  echo '<script async defer
    src="https://maps.googleapis.com/maps/api/js?key=' . $key[0] . '&libraries=places&callback=init"></script>';

  //Freeing Memory and Closing connection
  unset($key);
  pg_free_result($result);
  pg_close($dbconn);
  
  ?>
</body>

</html>