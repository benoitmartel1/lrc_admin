<?php 
  include('php/activities.php');
?>
<!DOCTYPE html>
<html>
<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>LRC - Panneau de contrôle</title>
	<link rel="stylesheet" type="text/css" href="css/main.css">
	<link href="https://fonts.googleapis.com/css?family=Nunito:400,800&display=swap" rel="stylesheet">
	<link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
<script src="//cdnjs.cloudflare.com/ajax/libs/list.js/1.5.0/list.min.js"></script>
<script src="js/jquery-3.4.1.js"></script>
<script src="js/text_FR.js"></script>
<script>
var programs = <?php echo json_encode($programs); ?>;
console.log(programs);
</script>
<script src="js/search.js"></script>


</head>

<body>
<div class="filters">
<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Âge
  </button>
  <div id="ageFilter" class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" href="#">Adulte</a>
	<div class="dropdown-divider"></div>
    <a class="dropdown-item" href="#">18</a>
    <a class="dropdown-item" href="#">17</a>
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
<!-- userList.filter(function(item) {
if (item.values().duration < 1) {
   return true;
} else {
   return false;
}
});  -->
