<?php
include('../../db_connect.php');

$table=$_POST['table'];
$id=$_POST['id'];
$value=$_POST['value'];

//Make sure program id exists in db
if ($table=='programs') {
    $query = "INSERT INTO `search_params_{$table}` (id) VALUES ('$id')";
    $result = mysqli_query($db, $query);
}

//Update the property
$query = "UPDATE `search_params_{$table}` SET visible=$value WHERE id='$id'";

$result = mysqli_query($db, $query);
if ($result) {
    return 1;
};
