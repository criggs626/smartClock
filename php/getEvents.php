<?php
$conn = new mysqli("localhost", "clockSite", "","CLOCK");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$query =$conn->query("SELECT * FROM events");
$rows = array();
$count=0;
while($row = $query->fetch_assoc()) {
    $array = array($row["id"], $row["description"], $row["location"], $row["time"]);
	$rows[] = $array;
	$count++;
}
echo ('{"recordsTotal":'.(string)$count.',"data":'.str_replace("}","]",str_replace("{","[",json_encode($rows)))."}");
?>
