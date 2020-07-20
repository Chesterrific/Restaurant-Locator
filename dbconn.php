<?php
$dbconn = pg_connect(getenv("DATABASE_URL"))
  or die('could not connect: ' . pg_last_error());

$query = 'Select value from "keys" where name = $1';
$result = pg_prepare($dbconn, "my_query", $query);
$result = pg_execute($dbconn, "my_query", array("api"));
$key = pg_fetch_array($result, 0, PGSQL_NUM);
