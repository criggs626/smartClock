<?php
$ids=$_POST['id'];
$ids = implode(",", $ids);   

$sql="DELETE FROM events WHERE ID IN(".$ids.");";

$conn = new SQLite3("clockSite.db");

echo $sql;

$conn->exec($sql);

?>
