<?php
session_start();
if(isset($_SESSION["userStatus"])){
  echo($_SESSION["userStatus"]);
}
else{
  echo("Not logged in");
}

?>
