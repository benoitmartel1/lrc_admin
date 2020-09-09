<?php
//Log Check
include('log_check.php');
//db connect
include('db_connect.php');

$query = "SELECT value FROM trackers WHERE type='input' ORDER BY timestamp DESC";
$result = $db->query($query);
$query = "SELECT value, COUNT(*) as nb FROM trackers WHERE type='f-age' GROUP BY value ORDER BY COUNT(*) DESC";
$age = $db->query($query);

?>
<!DOCTYPE html>
<html>
<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>LRC - Panneau de contrôle 2</title>
	<link href="https://fonts.googleapis.com/css?family=Nunito:400,800&display=swap" rel="stylesheet">
	<link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
	<link rel="stylesheet" type="text/css" href="css/staff.css">

<script
  src="https://code.jquery.com/jquery-3.4.1.min.js"
  integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
  crossorigin="anonymous"></script>
</head>
<body>
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
    echo "<td>" . $row['age'] . "</td>";
    echo "<td>" . $row['nb'] . "</td>";

    echo "</tr>";
}
echo "</table>";

?>
</body>
</html>
