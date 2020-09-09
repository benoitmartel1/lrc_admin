<?php
//db connect  
//This file inserts user interactions as trackers in trackers db
include('../../db_connect.php');

$session_id=$db->real_escape_string($_POST['sessionId']);
$type=$db->real_escape_string($_POST['type']);
$val=$db->real_escape_string($_POST['value']);

$query = "INSERT INTO trackers (session_id, type,  value) VALUES ('$session_id', '$type', '$val')";

if ($db->query($query) !== TRUE) {
  echo "Error: " . $query . "<br>" . $db->error;
}

$db->close();

?>