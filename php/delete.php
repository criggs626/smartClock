<?php
$ids=$_POST['id'];
$ids = implode(",", $ids);   

$sql="DELETE FROM events WHERE ID IN(".$ids.");";

$conn = new SQLite3("clockSite.db");

if ($conn->query($sql) === TRUE) {
    echo "Deleted Records succesfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

?>
