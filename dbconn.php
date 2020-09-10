<?php
// Connects to Heroku postgres database
$dbconn = pg_connect(getenv("DATABASE_URL"))
  or die('could not connect: ' . pg_last_error());

// Prepared statements for query
$query = 'Select value from "keys" where name = $1';
$result = pg_prepare($dbconn, "my_query", $query);
$result = pg_execute($dbconn, "my_query", array("api"));

// $result is the resource used for the query, 0 is the index of the array, PGSQL_NUM returns an array with numerical indices. 
// https://www.php.net/manual/en/function.pg-fetch-array.php
$key = pg_fetch_array($result, 0, PGSQL_NUM);
