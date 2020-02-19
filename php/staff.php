<?php
$db = mysqli_connect('localhost', 'renaudcoursol', 'xuY8#VdvNQE8', 'renaudcoursol_admin');
  $user_check_query = "SELECT 
  nom, 
  prenom, 
  email,
  phone,
  cell 
  FROM staff";
  $result = mysqli_query($db, $user_check_query);
$staff = mysqli_fetch_all ($result, MYSQLI_ASSOC);
?>