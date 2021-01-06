<?php
include('../../db_connect.php');

$table=$_POST['table'];
$id=$_POST['id'];
$value=$_POST['value'];

$query = "UPDATE `search_params_{$table}` SET visible=$value WHERE id='$id'";

$result = mysqli_query($db, $query);
if ($result) {
    return 1;
};
