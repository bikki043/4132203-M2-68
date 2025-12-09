<?php
$host = "db";
$user = "root";
$pass = "1234";
$db   = "mydb";
try{
    $conn = new mysqli($host, $user, $pass, $db);
    if($conn->connect_error){
        throw new Exception("Connection failed: ");
    }
}
catch(Exception $e){
    echo $e->getMessage();

}


