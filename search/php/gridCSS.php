<?php
/*** set the content type header ***/
header("Content-type: text/css", true);

/***
query the database for the background color
provided you have a valid MySQL connection or whatever you are using.
***/
include('params.php');

$gridColumnsWidth='';
$gridColumnsAreas='';
$gridColumnsAreasDetails='';

usort($params['columns'], function ($item1, $item2) {
    return $item1['rank'] <=> $item2['rank'];
});

foreach ($params['columns'] as $column) {
    echo $index;
    if ($column['visible']==true) {
        $gridColumnsWidth.=strval($column['width'])."fr ";
        $gridColumnsAreas.=strval($column['type'])." ";
        if (empty($gridColumnsAreasDetails)) {
            $gridColumnsAreasDetails.="spacer ";
        } else {
            $gridColumnsAreasDetails.="details ";
        };
    }
};

?>
//FULL SIZE
.activity.grid,
.category-header .grid {
  grid-template-columns: "<?php echo $gridColumnsWidth; ?>";
  grid-template-rows: minmax(40px, auto);
  grid-template-areas:
    "<?php echo $gridColumnsAreas; ?>"
    "<?php echo $gridColumnsAreasDetails; ?>";
}

@media (min-width: 480px) and (max-width: 1260px) {
  .activity.grid,
  .category-header .grid {
    grid-template-columns: 2fr 0.5fr 1fr 2fr 0.75fr 0.75fr 0.75fr 1fr;
    grid-template-areas:
      "name info age schedule price cours session signup"
      "spacer details details details details details details details";
  }
}

/* Landscape phones and down */
@media (max-width: 480px) {
  .activity.grid {
    grid-template-columns: 1fr 1fr 1fr 0.5fr;
    grid-auto-rows: 30px 30px auto;
    grid-template-areas:
      "name name name info"
      "age schedule schedule schedule"
      "session price signup signup"
      "details details details details";
  }
  .details .grid {
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: auto 80px;
    grid-template-areas:
      "summary infos infos"
      "thumb thumb thumb";
  }
  
}
