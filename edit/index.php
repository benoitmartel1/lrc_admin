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

  $id=$_REQUEST['id'];

/* change character set to utf8 */
if (!$db->set_charset("utf8")) {
    printf("Error loading character set utf8: %s\n", $db->error);
    exit();
};

$user_check_query = "SELECT id, nom, prenom, email, phone, cell FROM staff WHERE id=$id";
  $result = mysqli_query($db, $user_check_query);
$infos = $result->fetch_all( MYSQLI_ASSOC );

?>
<!DOCTYPE html>
<html>
<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>LRC - Personnel - Éditer</title>
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
// var staff = <?php echo json_encode($infos); ?>;
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

<?php echo $infos->nom; ?>

</div>

</body>
</html>
