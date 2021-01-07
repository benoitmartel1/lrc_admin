<?php
//Log Check
include('../log_check.php');
//db connect
include('../db_connect.php');

$query = "SELECT value FROM trackers WHERE type='input' ORDER BY timestamp DESC";
$result = $db->query($query);
$query = "SELECT DISTINCT value,  COUNT(*) as nb FROM trackers WHERE type='f-age' GROUP BY value ORDER BY COUNT(*) DESC";
$age = $db->query($query);
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
	<div class="wrapper-center">
	<?php include_once('../header.php'); ?>
	<?php
    echo "<table border='1'>
	<tr>
	<th>Recherche</th>
	</tr>";
    while ($row = mysqli_fetch_array($result)) {
        echo "<tr>";
        echo "<td>" . $row['value'] . "</td>";
        echo "</tr>";
    }
    echo "</table>";

    echo "<table border='1'>
	<tr>
	<th>Âge</th>
	<th>#</th>
	</tr>";
    while ($row = mysqli_fetch_array($age)) {
        echo "<tr>";
        echo "<td>" . $row['value'] . "</td>";
        echo "<td>" . $row['nb'] . "</td>";

        echo "</tr>";
    }
    echo "</table>";
    ?>
	</div>
</body>
</html>
