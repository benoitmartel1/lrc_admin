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
<script src="js/jquery-3.4.1.js"></script>
<script src="js/list.min.js"></script>
<script>
var programs = <?php echo json_encode($programs); ?>;
console.log(programs);

var options = {
  valueNames: [ 'name', 'price' ]
};
$(document).ready(function(){
var userList = new List('users', options);
});



</script>

</head>

<body>
<div id="users">

<!-- class="search" automagically makes an input a search field. -->
  <input class="search" placeholder="Search" />
<!-- class="sort" automagically makes an element a sort buttons. The date-sort value decides what to sort by. -->
  <button class="sort" data-sort="name">
    Sort
  </button>

<!-- Child elements of container with class="list" becomes list items -->
  <ul class="list">
    <li>
<!-- The innerHTML of children with class="name" becomes this items "name" value -->
      <h3 class="name">Jonny Stromberg</h3>
      <p class="price">1986</p>
    </li>
  </ul>

</div>
</body>
</html>
