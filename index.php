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
?>
<!DOCTYPE html>
<html>
<head>
	<title>LRC - Panneau de contrôle</title>
	<link rel="stylesheet" type="text/css" href="main.css">
	<link href="https://fonts.googleapis.com/css?family=Nunito:400,800&display=swap" rel="stylesheet">
</head>
<body>
<div class="content">
  	<header>
		  <div class="log-info">
    <!-- logged in user information -->
    <?php  if (isset($_SESSION['username'])) : ?>
    	<div>Bienvenue <strong><?php echo $_SESSION['username']; ?></strong></div>
    	<div> <a href="index.php?logout='1'" style="color: red;">Déconnexion</a> </div>
	<?php endif ?>
</div>
</header>
</div>
		
</body>
</html>