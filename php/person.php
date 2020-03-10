<?php
include('../db_connect.php');

$person_id=$_POST['id'];
$name=mysqli_real_escape_string($_POST['name']);
$surname=mysqli_real_escape_string($_POST['surname']);

function updatePerson(){
$query="UPDATE person SET name='$name', surname='$surname' WHERE id=$person_id"
}
function deletePerson(){
$query="DELETE FROM person WHERE person=$person_id"
}

if (!$db -> query($query)) {
  echo("Error description: " . $db -> error);
}

$db -> close();