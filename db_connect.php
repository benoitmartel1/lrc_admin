<?php
$db = new mysqli('localhost', 'renaudcoursol_trackers', 'Vw])yjG-+ExZ', 'renaudcoursol_admin');
  /* change character set to utf8 */
if (!$db->set_charset("utf8")) {
    printf("Error loading character set utf8: %s\n", $db->error);
    exit();
};