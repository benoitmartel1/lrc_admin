<?php
//Login Check
include($_SERVER['DOCUMENT_ROOT'].'/admin/log_check.php');
//Get all existing programs in Amilia
include('php/programs.php');
//Local db connect
include('../db_connect.php');

//Params object that holds all configurable items from db to be passed to js.
$params=[];

$paramsTables=['programs','columns','filters'];

foreach ($paramsTables as $paramsTable) {
    $params[$paramsTable]=getParams($paramsTable, $db);
};

function getParams($tableName, $db)
{
    $temp=[];
    $query = "SELECT * FROM `search_params_{$tableName}`";
    $result = $db -> query($query);
    while ($row = mysqli_fetch_array($result, MYSQLI_BOTH)) {
        $temp[]=$row;
    }
    return $temp;
};
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=e
		dge">
		<title>Grille de cours</title>
		<base href="https://renaudcoursol.com/admin/">

		<meta name="description" content="">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link href="https://fonts.googleapis.com/css?family=Nunito:400,800&display=swap" rel="stylesheet">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

		<link rel="stylesheet" type="text/css" href="css/main.css">
		<link rel="stylesheet" type="text/css" href="search/css/manager.css">
		<script src="https://kit.fontawesome.com/51b21781c6.js" crossorigin="anonymous"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

		<script src="search/js/routines.js"></script>
	<script
  src="https://code.jquery.com/jquery-3.4.1.min.js"
  integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
  crossorigin="anonymous"></script>
	<script type="text/javascript">
		var programs_from_api = <?php echo json_encode($programs); ?>;
		var params=<?php echo json_encode($params); ?>;

		function setCheckBox(value){
			return 'checkBox '+(value==true?'fas fa-check-square checked':'far fa-square');
		};
		$(document).ready(function () {
			  //Activate tooltips
			$('[data-toggle="tooltip"]').tooltip();
			//On value change, update db and checkbox
			$('body').on('click', '.checkBox',function(){
			    var target=$(this);
				var parent=$(this).closest('li');
				//Get infos of clicked item
				var table=$(parent).attr('id').split('-')[0];
				var id=$(parent).attr('id').split('-')[1];
				var prop=$(target).attr('data');
				var value=$(target).hasClass('checked');

				//Update db function(){
				$.post('search/php/updateParams.php', {table:table, id:id, value:!value, prop:prop}).done(function(data){
					//Si ok, Update CSS od checkbox
					$(target).removeClass().addClass(setCheckBox(!value));
				});
			});
			programs_from_api.slice(0,5).forEach(p => {
				var pref=params.programs.find(a=>a.id==p.Id);
				var visible=(pref)?pref.visible:p.IsVisible;
				var visiblePrint=(pref)?pref.visiblePrint:p.IsVisible;
				$('#programs').append('<li id="programs-'+p.Id+'"><span data="visible" class="'+setCheckBox(visible)+'"></span><span data="visiblePrint" class="'+setCheckBox(visiblePrint)+'"></span>'+p.Name+'</li>');
			});
			params.columns.forEach(p => {
				$('#columns').append('<li id="columns-'+p.id+'"><span data="visible" class="'+setCheckBox(p.visible)+'"></span><span data="visiblePrint" class="'+setCheckBox(p.visiblePrint)+'"></span>'+capitalize(p.name)+'</li>');
			});
			params.filters.forEach(p => {
				$('#filters').append('<li id="filters-'+p.id+'"><span data="visible" class="'+setCheckBox(p.visible)+'"></span><span data="visiblePrint" class="'+setCheckBox(p.visiblePrint)+'"></span>'+capitalize(p.name)+'</li>');
			});
		});
	</script>
		</head>
	<body>
	<?php include_once($_SERVER['DOCUMENT_ROOT'].'/admin/header.php'); ?>

	<div class="wrapper-center">
		<div class="right">		
			<a class="btn btn-success" href="https://renaudcoursol.com/activites" target="_blank" role="button"><i class="far fa-eye"></i>Site web</a>
			<a class="btn btn-success" href="https://renaudcoursol.com/admin/search/printable.php" target="_blank" role="button"><i class="fas fa-print"></i>Imprimable</a>
	</div>

		<div class="tab">
			<h5>Programmes</h5>
			<ul id="programs"><li><span data-toggle="tooltip" title="Visibilité sur le site web" class="fas fa-eye"></span><span data-toggle="tooltip" title="Visibilité sur la version imprimable" class="fas fa-print"></span></li></ul>
			<h5>Colonnes</h5>
			<ul id="columns"></ul>
			<h5>Filtres</h5>
			<ul id="filters"></ul>
		</div>
	</div>
	</body>
</html>