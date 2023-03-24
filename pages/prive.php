<?php
session_start();

require_once('connexion.php');
require_once("classes_for_control/User_operation.php");
$utilisateur = new Utilisateur("mysql:host=$host;dbname=$dbname", $username, $password);
$saveUser = $utilisateur->islogged($_SESSION['Auth']['email'],$_SESSION['Auth']['password']);

if ($saveUser===true) {
    // acces corrects
} else {
    header("location:login.php");
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <style>
        body {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    </style>
</head>

<body>
    <h1>Ma page priv&eacute;</h1>

    <br><br>
    <h3><?=$_SESSION['Auth']['email']  ?></h3>

    <br><br>
    <a href="logout.php">LOG OUT!!!</a>
</body>

</html>