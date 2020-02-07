<?php 
  include('php/activities.php');
?>
<!DOCTYPE html>
<html>
<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>LRC - Panneau de contrôle</title>

	<script src="//cdnjs.cloudflare.com/ajax/libs/list.js/1.5.0/list.min.js"></script>
<script src="js/jquery-3.4.1.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
<script src="js/text_FR.js"></script>
<script>
var programs = <?php echo json_encode($programs); ?>;
console.log(programs);
</script>

<script src="js/search.js"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">	<link href="https://fonts.googleapis.com/css?family=Nunito:400,800&display=swap" rel="stylesheet">
	<link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
	<link rel="stylesheet" type="text/css" href="css/main.css">

</head>

<body>
<div class="filters">
<div class="activeFilters"></div>
<div class="dropdown" id="ageFilter">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Âge
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" data="18" href="#">Adulte</a>
    <div class="dropdown-divider"></div>
	    <a class="dropdown-item" data="18" href="#">18</a>
		    <a class="dropdown-item" data="18" href="#">Bachibouzouk</a>
  </div>
</div>
</div>


<div id="users">

<!-- class="search" automagically makes an input a search field. -->
  <input class="search" placeholder="Search" />
<!-- class="sort" automagically makes an element a sort buttons. The date-sort value decides what to sort by. -->
  <button class="sort" data-sort="name">
    Sort
  </button>

<!-- Child elements of container with class="list" becomes list items -->
  <ul class="list">

  </ul>

</div>

</body>

</html>
