<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Restaurant Locator | Welcome</title>
  <link rel="stylesheet" href="css/style.css">
</head>

<body>
  <section id="mapHolder">
    <div id="map"></div>
  </section>

  <section id="search">
    <button class="locateBtn" onclick="FindCurrentLoc()">Use Current Location</button>
    <div id="searchTab">
      <input id="address" type="text">
      <button class="locateBtn" onclick="SearchLoc()">Search</button>
    </div>
  </section>

  <script src="js/main.js"></script>
  <?php
  include 'connect.php';
  echo '<script async defer
    src="https://maps.googleapis.com/maps/api/js?key=' . $key[0] . '&callback=Init"></script>';

  // Freeing Memory and Closing connection
  unset($key);
  pg_free_result($result);
  pg_close($dbconn);
  ?>
</body>

</html>