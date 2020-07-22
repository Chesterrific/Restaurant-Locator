<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Restaurant Locator | Welcome</title>
  <link rel="stylesheet" href="css/style.css">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
</head>

<body>
  <section id="mapHolder">
    <div id="map"></div>
  </section>

  <section id="overlay">
    <div id="overlayContent">
      <h1 class="centered">Random Restaurant Locator</h1>
      <button class="locateBtn" onclick="FindCurrentLoc()">Use Current Location</button>
      <div id="searchTab">
        <input id="address" type="text">
        <button class="locateBtn" onclick="SearchLoc()">Search</button>
      </div>
      <a class="centered" id="closeOverlayBtn" onclick="CloseOverlay()">^</a>
    </div>
  </section>

  <section id="results">
    <h2 id="title">Search Criteria</h2>
    <ul id="criteria">
      <li class="option">Food Type: <input type="text" id="foodType" value="Ex. Burgers"></li>
      <li class="option" id="priceRange">Max Price Range:
        <select name="prices" id="prices">
          <option value="1">$ (Least Expensive)</option>
          <option value="2">$$</option>
          <option value="3">$$$</option>
          <option value="4">$$$$ (Most Expensive)</option>
        </select>
      </li>
      <li class="option" id="open">Open Now?:
        <label for="yes">Yes</label>
        <input type="radio" id="yes" name="open?" value="true" checked>
        <label for="no">No</label>
        <input type="radio" id="no" name="open?" value="false">
      </li>
    </ul>
    <button onclick="OpenOverlay()">New Starting Position</button>
    <button onclick="SearchRestaurants()">Begin Search</button>
  </section>

  <script src="js/main.js"></script>
  <script src="js/style.js"></script>
  
  <?php
  include 'dbconn.php';
  echo '<script async defer
    src="https://maps.googleapis.com/maps/api/js?key=' . $key[0] . '&libraries=places&callback=Init"></script>';

  //Freeing Memory and Closing connection
  unset($key);
  pg_free_result($result);
  pg_close($dbconn);
  ?>
</body>

</html>