<?php
$conn = new SQLite3("clockSite.db");
$userName=$_POST['username'];
$password=$_POST['password'];
$query =$conn->query("SELECT * FROM users");
$rows=array();
$count=0;
while($row = $query->fetchArray()) {
  if($userName==$row["uname"]){
    if($password==$row["password"]){
      session_start();
      $_SESSION["userStatus"] = "green";
      exit("true");
    }
  }
}
exit("false");
?>
