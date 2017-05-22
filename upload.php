<?php

if (!empty($_FILES)) {
     
    $tempFile = $_FILES['file']['tmp_name'];          //3             
    
    $targetFile = "img/active.jpg";  //5
 
    move_uploaded_file($tempFile,"img/active.jpg"); //6
   
    
}
echo "Success";