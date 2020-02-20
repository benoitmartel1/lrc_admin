<?php 
//Login Check
include('log_check.php');
  //db connect  
include('db_connect.php');
  //db connect  
include('php/activities.php');

$id=$_REQUEST['id'];

$member_infos = "SELECT id, nom, prenom, email, phone, cell, work, address FROM staff WHERE id=$id";
$result = mysqli_query($db, $member_infos);
$infos = $result->fetch_all( MYSQLI_ASSOC )[0];
?>
<!DOCTYPE html>
<html>
<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>LRC - Personnel - Éditer</title>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	<link rel="stylesheet" type="text/css" href="css/main.css">
	<link href="https://fonts.googleapis.com/css?family=Nunito:400,800&display=swap" rel="stylesheet">
	<link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
	<link rel="stylesheet" type="text/css" href="css/edit.css">
<script
  src="https://code.jquery.com/jquery-3.4.1.min.js"
  integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
  crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/list.js/1.5.0/list.min.js"></script>
<script>
var programs = <?php echo json_encode($programs); ?>;
$(function () {
var activities=[];
programs.forEach(program => {
	program.Activities.forEach(activity => {
		$('#activities .list').append(`<li id="${activity.Id}"><div class="activity">${activity.Name}</div></li>`);
	});
});

  $("li").click(e => {
    let activity_id = $(e.target)
      .closest("li")
	  .attr("id");
	let staff_id = $('form').attr('id');
	$.post( "php.activityToStaff.php", {
		activity_id:activity_id,
		staff_id:staff_id
	}
	);
  });

  var options = {
    valueNames: ["activity"]
  };
var activitiesList = new List("activities", options);
});
</script>
	<!-- <script src="js/edit.js"></script> -->
</head>
<body>
<?php include_once('header.php'); ?>

<div class="content">
<a href="index.php"><i class="fa fa-arrow-left fa-3x" aria-hidden="true"></i></a>
<form id="<?php echo $infos['id']; ?>">
<div class="row">
	<div class="col-6">
	  	<div class="form-group row">
			<label for="prenom" class="col-sm-4 col-form-label">Prénom</label>
			<div class="col-sm-8">
				<input type="text" class="form-control" id="prenom" value="<?php echo $infos['prenom']; ?>">
			</div>
		</div>
		<div class="form-group row">
			<label for="nom"  class="col-sm-4 col-form-label">Nom</label>
			<div class="col-sm-8">
	   			 <input type="text" class="form-control" id="nom" value="<?php echo $infos['nom']; ?>">
			</div>
 		</div>
		<div class="form-group row">
			<label for="phone"  class="col-sm-4 col-form-label">Téléphone</label>
			<div class="col-sm-8">
	   			 <input type="tel" class="form-control" id="phone" value="<?php echo $infos['phone']; ?>">
			</div>
 		</div>
		 		<div class="form-group row">
			<label for="cell"  class="col-sm-4 col-form-label">Cellulaire</label>
			<div class="col-sm-8">
	   			 <input type="tel" class="form-control" id="cell" value="<?php echo $infos['cell']; ?>">
			</div>
 		</div>
		 		<div class="form-group row">
			<label for="work"  class="col-sm-4 col-form-label">Travail</label>
			<div class="col-sm-8">
	   			 <input type="tel" class="form-control" id="work" value="<?php echo $infos['work']; ?>">
			</div>
 		</div>
    </div>
		<div class="col-6">
		  	<div class="form-group row">
			<label for="address" class="col-sm-4 col-form-label">Adresse</label>
			<div class="col-sm-8">
				<input type="text" class="form-control" id="address" value="<?php echo $infos['address']; ?>">
			</div>
		</div>
	</div>
</div>

</div>
<div class="row">
<div id="activities">
<!-- class="search" automagically makes an input a search field. -->
  <input class="search" placeholder="Quelle activité ?" />
<!-- Child elements of container with class="list" becomes list items -->
  <ul class="list no-select">
  </ul>

</div>

</div>
  <button type="submit" class="btn btn-primary">Sauvegarder</button>
</form>
</div>

</body>
</html>
