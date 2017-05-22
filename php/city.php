<?php

$city=$_POST["location"];
file_put_contents("..//img//city.txt",$city,FILE_USE_INCLUDE_PATH);
echo $city;
?>