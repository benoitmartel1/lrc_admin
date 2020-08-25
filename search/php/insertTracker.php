<?php
//db connect  
include('../../db_connect.php');

if ($db) {
  echo 'connected';
} else {
  echo 'not connected';
}

$session_id=$_POST['sessionId'];
$type=$db->real_escape_string($_POST['type']);
$val=$db->real_escape_string($_POST['value']);

$query = "INSERT INTO tracker_input (session_id, val) VALUES ('$session_id', '$value')";

if ($db->query($query) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$db->close();

?>