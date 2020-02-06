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
  <ul class="list"></ul>

</div>
<script>
var programs = <?php echo json_encode($programs); ?>;
console.log(programs);

var options = {
  valueNames: [ 'name', 'price' ],
  item: '<li><h3 class="name"></h3><p class="price"></p></li>' 
};
var values = [{ 
    name: 'Jonny Strömberg', 
    price: 1986 
  }, 
  { 
    name: 'Jonas Arnklint', 
    price: 1985 
  }, 
  { 
    name: 'Martina Elm', 
    price: 1986 
}]; 


var userList = new List('users', options, values);




</script>
</body>

</html>
