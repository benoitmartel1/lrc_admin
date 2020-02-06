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
  <ul class="list">

  </ul>

</div>
<script>
var programs = <?php echo json_encode($programs); ?>;
console.log(programs);

var options = {
  valueNames: [ 'name', 'price', "ageMin", "day", "hour", "duration" ] 
};

$(programs).each(function(){
	$(this.Activities).each(function(){
		var sDate=new Date(this.StartDate);
		var eDate=new Date(this.EndDate);
		$('.list').append(
				`
				<li>
				<img class="thumb" src="${this.PictureUrl}"/> 
				<div class="name">${this.Name}</div>
				<div class="price">${this.Price}</div>
				<div class="ageMin">${this.Age.Min}</div>
				<div class="startDate">${this.StartDate}</div>
				<div class="day">${sDate.getDay()}</div>
				<div class="hour">${sDate.getHours()}</div>
				<div class="duration">${((eDate.getHours()+eDate.getMinutes()/60)-(sDate.getHours()+eDate.getMinutes()/60))+' hours'}</div>
				</li>
				`
		);
	});
});

var userList = new List('users', options);

</script>
</body>

</html>
<!-- userList.filter(function(item) {
if (item.values().day == 4) {
   return true;
} else {
   return false;
}
});  -->