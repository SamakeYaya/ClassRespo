<?php
session_start();
//inclure la base de donnees dans ce fichier

// Inclusion de ma classe contenant les fonctions pour gérer les utilisateurs
require_once("../classes_for_control/User_operation.php");

// Inclusion du fichier de connexion à la base de données
require_once('../connexion.php');

// Récupérer les données de formulaire envoyées par AJAX
$data = json_decode(file_get_contents("php://input"), true);

// Récupérer les valeurs spécifiques du formulaire
$pass = $data['pass'];
$email = $data['email'];

$utilisateur = new Utilisateur("mysql:host=$host;dbname=$dbname", $username, $password);
$connecter = $utilisateur->connecterUtilisateur($email, $pass);
if ($connecter === true) {

    $_SESSION['Auth'] = [
        'email' => $email,
        'password' => $pass,
        'ip_address' => $_SERVER['REMOTE_ADDR'],
        'user_agent' => $_SERVER['HTTP_USER_AGENT']
    ];

    // print_r(json_encode($connecter));
    $success = 1;
    $msg = 'Connectee!';
} else {
    $success = 0;
    $msg = 'Vos acc&egrave;s sont incorrectes!';
}

$data_send = [
    'succes' => $success,
    'msg' => $msg
];

echo  json_encode($data_send);
