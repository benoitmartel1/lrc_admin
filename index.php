<?php 
  session_start(); 

  if (!isset($_SESSION['username'])) {
  	$_SESSION['msg'] = "You must log in first";
  	header('location: registration/login.php');
  }
  if (isset($_GET['logout'])) {
  	session_destroy();
  	unset($_SESSION['username']);
  	header("location: registration/login.php");
  }

 include('php/staff.php');
 
?>



?>
<!DOCTYPE html>
<html>
<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>LRC - Panneau de contrôle</title>
	<link rel="stylesheet" type="text/css" href="css/main.css">
	<link href="https://fonts.googleapis.com/css?family=Nunito:400,800&display=swap" rel="stylesheet">
	<link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
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




</div>

</body>
</html>
