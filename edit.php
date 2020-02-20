<?php 
//Login Check
include('log_check.php');
  //db connect  
include('db_connect.php');

$id=$_REQUEST['id'];

$member_infos = "SELECT id, nom, prenom, email, phone, cell FROM staff WHERE id=$id";
$result = mysqli_query($db, $member_infos);
$infos = $result->fetch_all( MYSQLI_ASSOC )[0];
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

	<!-- <script src="js/edit.js"></script> -->
</head>
<body>
<?php include_once('header.php'); ?>

<div class="content">

<form>
  <div class="form-group">
    <label for="prenom">Prénom</label>
    <input type="text" class="form-control" id="prenom"><?php echo $infos['prenom']; ?>
	<label for="nom">Nom</label>
    <input type="text" class="form-control" id="nom"><?php echo $infos['nom']; ?>
  </div>
  <div class="form-group">
    <label for="phone">Téléphone</label>
    <input type="tel" class="form-control" id="phone"><?php echo $infos['phone']; ?>
	    <label for="cell">Cellulaire</label>
    <input type="tel" class="form-control" id="cell">
	    <label for="work">Travail</label>
    <input type="tel" class="form-control" id="work">
  </div>
  <div class="form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>


</div>

</body>
</html>
