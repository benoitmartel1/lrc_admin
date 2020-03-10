<?php
include('../db_connect.php');

$person_id=$_POST['id'];
$name=$db->real_escape_string($_POST['name']);
$surname=$db->real_escape_string($_POST['surname']);

$query="UPDATE person SET name='$name', surname='$surname' WHERE id=$person_id";

//A mettre ailleurs
// function deletePerson($person_id){
// $query="DELETE FROM person WHERE person=$person_id";
// }

if (!$db -> query($query)) {
  echo("Error description: " . $db -> error);
}

$db -> close();
?>