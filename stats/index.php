<?php
//Log Check
include('../log_check.php');
//db connect
include('../db_connect.php');

$query = "SELECT DISTINCT value, COUNT(*) as nb FROM trackers WHERE type='input' GROUP BY value ORDER BY COUNT(*) DESC LIMIT 20";
$result = $db->query($query);
$query = "SELECT DISTINCT value, COUNT(*) as nb FROM trackers WHERE type='f-day' GROUP BY value ORDER BY COUNT(*) DESC LIMIT 20";
$day = $db->query($query);
$query = "SELECT DISTINCT value,  COUNT(*) as nb FROM trackers WHERE type='f-age' GROUP BY value ORDER BY COUNT(*) DESC";
$age = $db->query($query);
$days=['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

?>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>Statistiques</title>
	<base href="https://renaudcoursol.com/admin/">
	<link href="https://fonts.googleapis.com/css?family=Nunito:400,800&display=swap" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="css/main.css">
	<script src="https://kit.fontawesome.com/51b21781c6.js" crossorigin="anonymous"></script>
	<script
	src="https://code.jquery.com/jquery-3.4.1.min.js"
	integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
	crossorigin="anonymous"></script>
</head>
<body>
	<?php include_once('../header.php'); ?>
	<div class="wrapper-center">
	<?php
        echo "<ul>";
        echo '<h4>Recherches</h4>';
        echo "<li><b><div class='item'>Activité</div><div class='count'>Nb</div></b></li>";
        while ($row = mysqli_fetch_array($result)) {
            echo "<li><div class='item'>" . $row['value'] . "</div><div class='count'>" . $row['nb']."</div></li>";
        }
        echo "</ul>";
        echo "<ul>";
        echo '<h4>Filtre âge</h4>';
        echo "<li><b><div class='item'>Âge</div><div class='count'>Nb</div></b></li>";
        while ($row = mysqli_fetch_array($age)) {
            echo "<li><div class='item'>" . $row['value'] . " ans</div><div class='count'>" . $row['nb']."</div></li>";
        }
        echo "</ul>";
        echo "<ul>";
        echo '<h4>Filtre jour</h4>';
        echo "<li><b><div class='item'>Jour</div><div class='count'>Nb</div></b></li>";
        while ($row = mysqli_fetch_array($day)) {
            echo "<li><div class='item'>" . $days[$row['value']] . "</div><div class='count'>" . $row['nb']."</div></li>";
        }
        echo "</ul>";

    ?>
	</div>
</body>
</html>
<style>
ul{
    display:inline-block;

    margin-right:50px;
    vertical-align: top;
}
    li div {
        display:inline-block;
       width:40px;
    }
    .item{
        width:120px;
    }
</style>