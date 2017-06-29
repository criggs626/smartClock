<?php
if($_SESSION["userStatus"]){
  exit($_SESSION["userStatus"]);
}
else{
  exit(false);
}
?>
