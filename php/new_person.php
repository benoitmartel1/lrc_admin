<?php
include('../db_connect.php');
$query="INSERT INTO person (name) VALUES (null)";
$db->query($query);

$new_record_id=$db->insert_id;

header("location: ../edit.php?id=".$new_record_id);
