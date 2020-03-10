<?php
include('../db_connect.php');

$person_id=$_POST['id'];
$name=$db->real_escape_string($_POST['name']);
$surname=$db->real_escape_string($_POST['surname']);
$phone=$db->real_escape_string($_POST['phone']);
$cell=$db->real_escape_string($_POST['cell']);
$work=$db->real_escape_string($_POST['work']);
$address=$db->real_escape_string($_POST['address']);
$city=$db->real_escape_string($_POST['city']);
$zipcode=$db->real_escape_string($_POST['zipcode']);
$birthdate=null;//$db->real_escape_string($_POST['birthdate']);
$creation_date=$db->real_escape_string($_POST['creation_date']);
$employee_number=$db->real_escape_string($_POST['employee_number']);
$pdq_number=$db->real_escape_string($_POST['pdq_number']);
$pdq_status=$db->$_POST['pdq_status'];
$pdq_delivery_date=$db->real_escape_string($_POST['pdq_delivery_date']);
$is_rcr=$db->$_POST['is_rcr'];

$query="UPDATE person SET 
name='$name',
surname='$surname',
phone='$phone',
cell='$cell',
work='$work',
address='$address',
city='$city',
zipcode='$zipcode',
birthdate=NULLIF('$birthdate',''),
creation_date=NULLIF('$creation_date',''),
employee_number='$employee_number',
pdq_number='$pdq_number',
pdq_status=NULLIF('$pdq_status',''),
pdq_delivery_date=NULLIF('$pdq_delivery_date',''),
is_rcr=NULLIF('$is_rcr','')
WHERE id=$person_id";

if (!$db -> query($query)) {
  echo("Error description: " . $db -> error);
}

$db -> close();
?>