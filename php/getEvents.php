<?php
$linkID = mysql_connect("localhost", "root", "") or die("Could not connect to host."); 
mysql_select_db("test", $linkID) or die("Could not find database."); 



$query = mysql_query("SELECT * FROM EVENTS");
$rows = array();
$count=0;
while($row = mysql_fetch_assoc($query)) {
    $array = array($row["id"], $row["description"], $row["location"], $row["time"]);
	$rows[] = $array;
	$count++;
}
echo ('{"recordsTotal":'.(string)$count.',"data":'.str_replace("}","]",str_replace("{","[",json_encode($rows)))."}");
?>