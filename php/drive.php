<?php
$content = file_get_contents('https://drive.google.com/embeddedfolderview?id=1hsuRy_H6ATRs7XRrLxH14Yrh5YLEx-ix#list');
$content = str_replace("/static","https://drive.google.com/static", $content);
echo $content;





?>