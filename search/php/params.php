<?php
//Local db connect
include($_SERVER['DOCUMENT_ROOT'].'/admin/db_connect.php');

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
