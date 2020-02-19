<?php
$db = mysqli_connect('localhost', 'renaudcoursol', 'xuY8#VdvNQE8', 'renaudcoursol_admin');
  $user_check_query = "SELECT nom, prenom FROM staff";
  $result = mysqli_query($db, $user_check_query);
while ($row = mysqli_fetch_array($result)) {
    printf("Prenom : %s  Nom : %s", $row['prenom'], $row['nom']);  
};

?>