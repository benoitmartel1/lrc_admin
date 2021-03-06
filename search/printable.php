<?php

//Get all existing programs in Amilia
include('php/programs.php');
//Local db connect
include('../db_connect.php');

//Params object that holds all configurable items from db to be passed to js.
$params=[];

$paramsTables=['programs','columns','filters'];

foreach ($paramsTables as $paramsTable) {
    $params[$paramsTable]=getParams($paramsTable, $db);
};

function getParams($tableName, $db)
{
    $temp=[];
    $query = "SELECT * FROM `search_params_{$tableName}`";
    $result = $db -> query($query);
    while ($row = mysqli_fetch_array($result, MYSQLI_BOTH)) {
        $temp[]=$row;
    }
    return $temp;
};
?>
<!DOCTYPE html>
<html>
	<head>
	<base href="https://renaudcoursol.com/admin/search/">

	<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
	<link rel="stylesheet" type="text/css" href="css/main.css">
	<link rel="stylesheet" type="text/css" href="css/search.css">
	<link rel="stylesheet" type="text/css" href="css/printable.css">

<script
  src="https://code.jquery.com/jquery-3.4.1.min.js"
  integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
  crossorigin="anonymous"></script>
  <script src="https://kit.fontawesome.com/51b21781c6.js" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.27.0/moment-with-locales.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/moment-timezone/0.5.31/moment-timezone.min.js"></script>
	<script>
		//Enable version to print format
		var printable=true;
		console.log("Printable : "+printable);
		var programs_from_api = <?php echo json_encode($programs); ?>;
		var params=<?php echo json_encode($params); ?>;
	</script>
	<script src="js-es5/list.min.js"></script>
	<script src="js-es5/text_fr.js"></script>
	<script src="js-es5/routines.js"></script>
	<script src="js-es5/search.js"></script>
	<script src="js-es5/trackers.js"></script>

</head>

<body>
<!-- <div class="black">1</div> -->
<div id="app">

<div class="header">
<div class="filters">
	<span id="text-filterBy"></span>
	<div id="age-drop" class="dropdown filter-drop">
		<button class="btn btn-outline-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			<span id="text-age"></span>
		</button>
		<div data="age" class="dropdown-menu" aria-labelledby="dropdownMenuButton">
			<a class="dropdown-item" data-type="age" data-value="18" href="#">Adulte</a>
			<div class="dropdown-divider"></div>
		</div>
	</div>
	<div id="day-drop" class="dropdown filter-drop">
		<button class="btn btn-outline-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
			aria-haspopup="true" aria-expanded="false">
			<span id="text-day"></span>
		</button>
		<div data="day" class="dropdown-menu" data-offset="window" aria-labelledby="dropdownMenuButton">	
		</div>
	</div>
	<div id="location-drop" class="dropdown filter-drop">
		<button class="btn btn-outline-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
			aria-haspopup="true" aria-expanded="false">
			<span id="text-location"></span>
		</button>
		<div data="location" class="dropdown-menu" data-offset="window" aria-labelledby="dropdownMenuButton">
		</div>
	</div>
	<div id="category-drop" class="dropdown filter-drop">
		<button class="btn btn-outline-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
			aria-haspopup="true" aria-expanded="false">
			<span id="text-category"></span>
		</button>
		<div data="category" class="dropdown-menu" data-offset="window" aria-labelledby="dropdownMenuButton">
		</div>
	</div>
	

</div>
<div class="input-group search-field">
<div class="applied-filters"></div>
	<input type="text" class="search" placeholder="Quelle activité cherchez-vous?">
	<!-- <button class="erase bg-transparent" style="margin-left: -40px; z-index: 100;">
		<i class="fa fa-times"></i>
	</button> -->
	
</div>

</div>
<div >


<!-- class="sort" automagically makes an element a sort buttons. The date-sort value decides what to sort by. -->
  <!-- <button class="sort" data-sort="name">
    Sort
  </button> -->

	<div id="text-noResult" class="noResult header-padding"></div>

<!-- Child elements of container with class="list" becomes list items -->
  <ul class="list no-select">
  </ul>
  <!-- Loading animation -->
  <div class="loading header-padding">
	  <h5 id="text-wait"></h5>
	<div class="lds-ellipsis loading-animation"><div></div><div></div><div></div><div></div></div>
		
  </div>
</div>
</div>
</body>

</html>
