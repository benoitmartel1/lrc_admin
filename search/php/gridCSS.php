<?php
/*** set the content type header ***/
header("Content-type: text/css", true);

/***
query the database for the background color
provided you have a valid MySQL connection or whatever you are using.
***/
include('params.php');

$neverShowThisColInMidSize=['start'];

$gridColumnsWidth='';
$gridColumnsAreas='';
$gridColumnsAreasDetails='';
$gridColumnsWidthMid='';
$gridColumnsAreasMid='';
$gridColumnsAreasDetailsMid='';

usort($params['columns'], function ($item1, $item2) {
    return $item1['rank'] <=> $item2['rank'];
});

foreach ($params['columns'] as $column) {
    $details=(empty($gridColumnsAreasDetails))?"spacer ":"details ";
    
    if ($column['visible']==true) {
        $gridColumnsWidth.=strval($column['width'])."fr ";
        $gridColumnsAreas.=$column['type']." ";
        $gridColumnsAreasDetails.=$details;

        if (!in_array($column['type'], $neverShowThisColInMidSize)) {
            $gridColumnsWidthMid.=strval($column['width'])."fr ";
            $gridColumnsAreasMid.=$column['type']." ";
            $gridColumnsAreasDetailsMid.=$details;
        }
    }
};

?>
.activity.grid,
.category-header .grid {


}
@media (min-width: 1260px) {
    .activity.grid,
    .category-header .grid {
      grid-template-columns: <?php echo $gridColumnsWidth; ?>;
      grid-template-rows: minmax(40px, auto);
      grid-template-areas:
        "<?php echo $gridColumnsAreas; ?>"
        "<?php echo $gridColumnsAreasDetails; ?>";
    }
}

@media (min-width: 560px) and (max-width: 1260px) {
  .activity.grid,
  .category-header .grid {
      grid-template-columns: <?php echo $gridColumnsWidthMid; ?>;
    grid-template-areas:
        "<?php echo $gridColumnsAreasMid; ?>"
        "<?php echo $gridColumnsAreasDetailsMid; ?>";
  }
}


