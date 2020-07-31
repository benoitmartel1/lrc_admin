<?php 

//db connect  
//include('db_connect.php');
//get activities
 require('php/activities.php');
?>
<!DOCTYPE html>
<html>
	<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title>LRC - Programmation</title>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
	<link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">

	<link rel="stylesheet" type="text/css" href="css/main.css">
	<link rel="stylesheet" type="text/css" href="css/search.css">
	
<script>
var activities = <?php echo json_encode($allActivities); ?>;
</script>

<script
  src="https://code.jquery.com/jquery-3.4.1.min.js"
  integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
  crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
	<script src="js/list.min.js"></script>
	<script src="js/text_FR.js"></script>
		<script src="data/locations.js"></script>

	<script src="js/routines.js"></script>
	<script src="js/search.js"></script>
	
</head>

<body>
<div class="black"></div>

<div class="wrapper">


<div class="filters">
	<span id="text-filterBy"></span>
	<div id="age-drop" class="dropdown filter-drop">
		<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			<span id="text-age"></span>
		</button>
		<div data="age" class="dropdown-menu" aria-labelledby="dropdownMenuButton">
			<a class="dropdown-item" data-type="age" data-value="18" href="#">Adulte</a>
			<div class="dropdown-divider"></div>
		</div>
	</div>
	<div id="day-drop" class="dropdown filter-drop">
		<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
			aria-haspopup="true" aria-expanded="false">
			<span id="text-day"></span>
		</button>
		<div data="day" class="dropdown-menu" aria-labelledby="dropdownMenuButton">	
		</div>
	</div>
	<div id="location-drop" class="dropdown filter-drop">
		<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
			aria-haspopup="true" aria-expanded="false">
			<span id="text-location"></span>
		</button>
		<div data="location" class="dropdown-menu" aria-labelledby="dropdownMenuButton">
		</div>
	</div>
	<div class="applied-filters"></div>

</div>


<div id="users">

<div class="sticky-header">	
<!-- class="search" automagically makes an input a search field. -->
<div class="input-group search-field">
	<input type="text" class="form-control search" placeholder="Quelle activité cherchez-vous?">
	<button class="erase bg-transparent" style="margin-left: -40px; z-index: 100;">
		<i class="fa fa-times"></i>
	</button>
</div>

<!-- class="sort" automagically makes an element a sort buttons. The date-sort value decides what to sort by. -->
  <!-- <button class="sort" data-sort="name">
    Sort
  </button> -->
</div>
	<div id="text-noResult" class="noResult"></div>

<!-- Child elements of container with class="list" becomes list items -->
  <ul class="list no-select">
  </ul>

</div>
</div>
</body>

</html>
