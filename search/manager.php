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
		<link rel="stylesheet" type="text/css" href="css/main.css">
		<link rel="stylesheet" type="text/css" href="search/css/manager.css">
		<script src="https://kit.fontawesome.com/51b21781c6.js" crossorigin="anonymous"></script>
		<script src="manager/js/routines.js"></script>
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
			//On value change, update db and checkbox
			$('body').on('click', 'li:has(.checkBox)',function(){
			    var target=$(this).find('.checkBox');
			    
				//Get infos of clicked item
				var table=$(this).attr('id').split('-')[0];
				var id=$(this).attr('id').split('-')[1];
				var value=$(target).hasClass('checked');

                console.log(value);
				//Update db function(){
				$.post('php/updateParams.php', {table:table, id:id, value:!value}).done(function(data){
					//Si ok, Update CSS od checkbox
					$(target).removeClass().addClass(setCheckBox(!value));
				});
			});
			programs_from_api.slice(0,5).forEach(p => {
				var pref=params.programs.find(a=>a.id==p.Id);
				var visible=(pref)?pref.visible:p.IsVisible;
				$('#programs').append('<li id="programs-'+p.Id+'"><span class="'+setCheckBox(visible)+'"></span>'+p.Name+'</li>');
			});
			params.columns.forEach(p => {
				$('#columns').append('<li id="columns-'+p.id+'"><span class="'+setCheckBox(p.visible)+'"></span>'+capitalize(p.name)+'</li>');
			});
			params.filters.forEach(p => {
				$('#filters').append('<li id="filters-'+p.id+'"><span class="'+setCheckBox(p.visible)+'"></span>'+capitalize(p.name)+'</li>');
			});
		});
	</script>
		</head>
	<body>
	<?php include_once($_SERVER['DOCUMENT_ROOT'].'/admin/header.php'); ?>

	<div class="wrapper-center">
		<div class="tab">
			<h3>Programmes</h3>
			<ul id="programs"><li><span class="fas fa-eye"></span></li></ul>
			<h3>Colonnes</h3>
			<ul id="columns"></ul>
			<h3>Filtres</h3>
			<ul id="filters"></ul>
		</div>
	</div>
	</body>
</html>