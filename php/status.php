<?php
if($_SESSION["userStatus"]){
  echo $_SESSION["userStatus"];
}
else{
  echo false;
}
exit("Status returned");
?>
