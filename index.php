<?php
//Login Check
include('log_check.php');
  //db connect
include('db_connect.php');

//   //Get activities
// $json = file_get_contents('https://renaudcoursol.com/admin/search/php/activities.php');
// $activities=json_decode($json)->allActivities;
// //Get all trackers
// $query = "SELECT * FROM trackers";
// $result = $db -> query($query);
// $trackers = $result->fetch_all(MYSQLI_ASSOC);

// print_r($trackers);


?>
<!DOCTYPE html>
<html>
<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>LRC Admin</title>
	<link href="https://fonts.googleapis.com/css?family=Nunito:400,800&display=swap" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="css/main.css">
	<script src="https://kit.fontawesome.com/51b21781c6.js" crossorigin="anonymous"></script>
	<script
  	src="https://code.jquery.com/jquery-3.4.1.min.js"
  	integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
  	crossorigin="anonymous"></script>
  	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/list.js/1.5.0/list.min.js"></script>
</head>
<body>
<?php include_once('header.php'); ?>
<a href="search/manager.php">Paramètres d'affichage des activités</a>
</body>
</html>
