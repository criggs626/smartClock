<?php
$db = new SQLite3("clockSite.db");

$name=$_POST['name'];
$location=$_POST['location'];
$time=$_POST['dtime'];
$sql ="INSERT INTO events (description,location,time) values('" . $name ."','".$location."','".$time."');";

echo $sql;
$db->exec($sql);

?>

<!--
CREATE TABLE events(
id int NOT NULL AUTO_INCREMENT,
description varchar(1000),
location varchar(100),
time varchar(20),
PRIMARY KEY (id)
)
-->
