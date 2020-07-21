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
    <button>New Starting Position</button>
  </section>

  <script src="js/main.js"></script>

  <!-- Delete after testing -->
  <script async defer src="https://maps.googleapis.com/maps/api/js?key=&callback=Init"></script>
  <!-- Delete after testing -->

  <?php
  // include 'connect.php';
  // echo '<script async defer
  //   src="https://maps.googleapis.com/maps/api/js?key=' . $key[0] . '&callback=Init"></script>';

  // Freeing Memory and Closing connection
  // unset($key);
  // pg_free_result($result);
  // pg_close($dbconn);
  ?>
</body>

</html>