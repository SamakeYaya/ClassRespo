<?php


// Inclusion de ma classe contenant les fonctions pour gérer les utilisateurs
require_once("../classes_for_control/User_operation.php");

// Inclusion du fichier de connexion à la base de données
require_once('../connexion.php');

// Récupérer les données de formulaire envoyées par AJAX
$data = json_decode(file_get_contents("php://input"), true);

// Récupérer les valeurs spécifiques du formulaire
$email = $data['email'];
$contact = $data['tel'];
$prenom = $data['fname'];
$nom = $data['lname'];
$passw = $data['passw'];

// Création d'une nouvelle instance de la classe Utilisateur pour gérer les utilisateurs dans la base de données
$utilisateur = new Utilisateur("mysql:host=$host;dbname=$dbname", $username, $password);

// Appel de la fonction enregistrerUtilisateur() pour enregistrer l'utilisateur dans la base de données
$saveUser = $utilisateur->enregistrerUtilisateur($prenom, $nom, $email, $contact, $passw);

// echo json_encode($saveUser);

switch ($saveUser) {
    case '1':
        $msg = "L'utilisateur enregistr&eacute; avec succ&egrave;s!";
        break;
    case '2':
        $msg = "L'utilisateur existe d&eacute;j&agrave;!";
        break;
    case '3':
        $msg = "Une erreur est survenu. Re-&eacute;ssay&eacute; svp!";
        break;
    default:
        $msg = "E-mail invalid";
        break;
}

$data_sender = [
    'succes' => $saveUser,
    'msg' => $msg
];

echo json_encode($data_sender);
