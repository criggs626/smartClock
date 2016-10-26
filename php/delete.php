<?php
$ids=$_POST['id'];
$ids = implode(",", $ids);   

$sql="DELETE FROM EVENTS WHERE ID IN(".$ids.");";

$conn = new mysqli("localhost", "root", "","test");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

if ($conn->query($sql) === TRUE) {
    echo "Deleted Records succesfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}


$conn->close();


?>