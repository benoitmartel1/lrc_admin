<?php

//This file loads all activities currently offered in a $programs object.
//Returns $staff array.

/* change character set to utf8 */
if (!$db->set_charset("utf8")) {
    printf("Error loading character set utf8: %s\n", $db->error);
    exit();
};

$user_check_query = "SELECT id, name, surname, email, phone, cell FROM person";
  $result = $db->query($user_check_query);
$staff = $result->fetch_all( MYSQLI_ASSOC );

?>