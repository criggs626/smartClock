<?php
$conn = new SQLite("clockSite.db");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$name=$_POST['name'];
$location=$_POST['location'];
$time=$_POST['dtime'];
$sql ="INSERT INTO events (description,location,time) values('" . $name ."','".$location."','".$time."');";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

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