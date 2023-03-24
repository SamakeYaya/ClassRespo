<?php
require_once("classes_for_control/User_operation.php");
utilisateur::deconnecterUtilisateur();
// Redirige l'utilisateur vers la page de connexion
header("Location: login.php");
exit;
