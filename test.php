<?php
$dbconn = pg_connect(getenv("DATABASE_URL"))
  or die('could not connect: ' . pg_last_error());

if ($dbconn) {
  echo 'yes';
} else {
  echo 'damn';
}
