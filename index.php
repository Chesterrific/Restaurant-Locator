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

  <input id="address" type="text">
  <button id="locate" onclick="findCurrentLoc()">Start</button>

  <script src="js/main.js"></script>
  <?php
  include 'connect.php';
  $key = pg_fetch_array($result, 0, PGSQL_ASSOC);
  echo '<script async defer
    src="https://maps.googleapis.com/maps/api/js?key=' . $key['value'] . '&callback=init"></script>';
    
    // Freeing Memory and Closing connection
    pg_free_result($result);
    pg_close($dbconn);
  ?>

</body>

</html>