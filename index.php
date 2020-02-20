<?php 
//db connect  
include('db_connect.php');
//db connect  
include('db_connect.php');
//get staff members
include('php/staff.php');
?>
<!DOCTYPE html>
<html>
<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>LRC - Panneau de contrôle</title>
	<link rel="stylesheet" type="text/css" href="css/main.css">
	<link href="https://fonts.googleapis.com/css?family=Nunito:400,800&display=swap" rel="stylesheet">
	<link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
	<link rel="stylesheet" type="text/css" href="css/staff.css">

<script
  src="https://code.jquery.com/jquery-3.4.1.min.js"
  integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
  crossorigin="anonymous"></script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/list.js/1.5.0/list.min.js"></script>
<script>
var staff = <?php echo json_encode($staff); ?>;
</script>
	<script src="js/staff.js"></script>
</head>
<body>
<div class="content">
  	<div class="header">
		  <div class="log-info">
    <!-- logged in user information -->
	<?php  if (isset($_SESSION['username'])) : ?>
			    	<div>Bienvenue <strong><?php echo $_SESSION['username']; ?></strong></div>
		<div> <a href="index.php?logout='1'"><i class="fa fa-sign-out logout"></i></a> </div>


	<?php endif ?>
		</div>
	</div>

<div id="staff">

<!-- class="search" automagically makes an input a search field. -->
  <input class="search" placeholder="" />
<!-- class="sort" automagically makes an element a sort buttons. The date-sort value decides what to sort by. -->
  <button class="sort" data-sort="nom">
    Nom
  </button>
  <button class="sort" data-sort="prenom">
    Prénom
  </button>
<!-- Child elements of container with class="list" becomes list items -->
  <ul class="list">

  </ul>

</div>

</div>

</body>
</html>
