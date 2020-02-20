<?php
include('../db_connect.php');

$activity_id=$_POST['activity_id'];
$staff_id=$_POST['staff_id'];

$user_check_query = "INSERT INTO `activity_to_staff`(`activity_id`, `staff_id`) VALUES ($activity_id, $staff_id)";
$result = mysqli_query($db, $user_check_query);

?>