<?php
$conn = new SQLite3("clockSite.db");

$query =$conn->query("SELECT * FROM events");
$rows=array();
$count=0;
while($row = $query->fetchArray()) {
    $array = array($row["id"], $row["description"], $row["location"], $row["time"]);
	$rows[] = $array;
	$count++;
}
echo ('{"recordsTotal":'.(string)$count.',"data":'.str_replace("}","]",str_replace("{","[",json_encode($rows)))."}");
?>
