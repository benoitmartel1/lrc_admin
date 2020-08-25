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
$value=$db->real_escape_string($_POST['value']);

$query = "INSERT INTO `tracker_input`(`session_id`, `value`) VALUES ($session_id, $value)";
$result = mysqli_query($db, $query);

echo $value;
echo $session_id;
echo $result;

?>