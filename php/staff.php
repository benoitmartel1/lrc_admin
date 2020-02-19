<?php
$db = mysqli_connect('localhost', 'renaudcoursol', 'xuY8#VdvNQE8', 'renaudcoursol_admin');
  
/* change character set to utf8 */
// if (!$db->set_charset("utf8")) {
//     printf("Error loading character set utf8: %s\n", $db->error);
//     exit();
// } else {
//     printf("Current character set: %s\n", $db->character_set_name());
// }


$user_check_query = "SELECT nom, prenom, email, phone, cell FROM staff";
  $result = mysqli_query($db, $user_check_query);
$staff = $result->fetch_all( MYSQLI_ASSOC );
?>