<?php

include('php/programs.php');
  //db connect
include('../db_connect.php');

$params_programs;
$params_columns;
$params_filters;

$query = "SELECT * FROM search_params_programs";
$result = $db -> query($query);
    
while ($row = mysqli_fetch_array($result, MYSQLI_BOTH)) {
    $params_programs[]=$row;
}

$query = "SELECT * FROM search_params_columns";
$result = $db -> query($query);
    
while ($row = mysqli_fetch_array($result, MYSQLI_BOTH)) {
    $params_columns[]=$row;
}

$query = "SELECT * FROM search_params_filters";
$result = $db -> query($query);
    
while ($row = mysqli_fetch_array($result, MYSQLI_BOTH)) {
    $params_filters[]=$row;
}

$params['programs']=$params_programs;
$params['columns']=$params_columns;
$params['filters']=$params_filters;

?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<title>Préférences</title>
		<meta name="description" content="">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<script src="https://kit.fontawesome.com/51b21781c6.js" crossorigin="anonymous"></script>
	</head>
	<script
  src="https://code.jquery.com/jquery-3.4.1.min.js"
  integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
  crossorigin="anonymous"></script>
	<script type="text/javascript">
		var programs_from_api = <?php echo json_encode($programs); ?>;
		var params=<?php echo json_encode($params); ?>;

		function setCheckBox(value){
			return 'checkBox '+(!!value?'fas fa-check-square checked':'far fa-square');
		};
		$(document).ready(function () {
			$('body').on('click', 'li:has(.checkBox)',function(){
				var checkBox=$(this).find('.checkBox');
				var state=($(checkBox).hasClass('checked'));
				$(checkBox).removeClass().addClass(setCheckBox(!state));
			});
			programs_from_api.forEach(p => {
				var pref=params.programs.find(a=>a.id==p.Id);
				var visible=(pref)?pref.visible:p.IsVisible;
				$('#programs').append('<li id="'+p.Id+'"><span class="'+setCheckBox(visible)+'"></span>'+p.Name+'</li>');
			});
			params.columns.forEach(p => {
				$('#columns').append('<li id="'+p.type+'"><span class="'+setCheckBox(p.visible)+'"></span>'+p.type+'</li>');
			});
			params.filters.forEach(p => {
				$('#filters').append('<li id="'+p.type+'"><span class="'+setCheckBox(p.visible)+'"></span>'+p.type+'</li>');
			});
		});
	</script>
	<body>
	<div class="tab search">
		<h3>Programmes</h3>
		<ul id="programs"></ul>
		<h3>Colonnes</h3>
		<ul id="columns"></ul>
		<h3>Filtres</h3>
		<ul id="filters"></ul>
	</div>
	</body>
</html>