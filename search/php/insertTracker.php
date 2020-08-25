<?php
//db connect  
include('../../db_connect.php');

$session_id=$_POST['sessionId'];
$type=$db->real_escape_string($_POST['type']);
$val=$db->real_escape_string($_POST['value']);

$query = "INSERT INTO tracker_input (session_id, value) VALUES ('$session_id', '$val')";

if ($db->query($query) !== TRUE) {
  echo "Error: " . $query . "<br>" . $db->error;
}

$db->close();

?>