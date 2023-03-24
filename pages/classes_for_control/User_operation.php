<?php
class Utilisateur
{
    private $db;

    public function __construct($dsn, $username, $password)
    {
        $this->db = new PDO($dsn, $username, $password);
    }

    public function enregistrerUtilisateur($prenom, $nom, $email, $contact, $passw)
    {

        // Vérification de la validité de l'email
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $succes = 0;
        } else {

            $prenom = $this->cleanInput($prenom);
            $nom = $this->cleanInput($nom);
            $email = $this->cleanInput($email);
            $contact = $this->cleanInput($contact);
            // $passw = $this->checkerInput($passw);

            // Vérification si l'utilisateur n'existe pas déjà
            if ($this->getUtilisateurParEmail($email) !== false) {
                // throw new Exception("L'utilisateur existe déjà");
                $succes = 2;
            } else {

                // Préparation de la requête d'insertion
                $query = $this->db->prepare("INSERT INTO user (prenom,nom, email,contact,passw) VALUES (:prenom,:nom, :email,:contact, :passw)");
                $data = [
                    ':prenom' => $prenom,
                    ':nom' => $nom,
                    ':email' => $email,
                    ':contact' => $contact,
                    ':passw' => password_hash($passw, PASSWORD_DEFAULT)
                ];
                $req = $query->execute($data);

                // Exécution de la requête
                if ($req) {

                    $succes = 1;
                } else {

                    $succes = 3;
                }
            }
        }
        return $succes;
    }

    public function modifierUtilisateur($id, $prenom, $nom, $email, $contact, $passw)
    {
        // Vérification de la validité de l'email
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $succes = 0;
        } else {

            $prenom = $this->cleanInput($prenom);
            $nom = $this->cleanInput($nom);
            $email = $this->cleanInput($email);
            $contact = $this->cleanInput($contact);

            // Préparation de la requête de mise à jour
            $query = $this->db->prepare("UPDATE user SET prenom = :prenom, nom = :nom, email = :email, contact = :contact, passw = :passw WHERE id = :id");
            $data = [
                ':prenom' => $prenom,
                ':nom' => $nom,
                ':email' => $email,
                ':contact' => $contact,
                ':passw' => password_hash($passw, PASSWORD_DEFAULT),
                ':id' => $id
            ];
            $req = $query->execute($data);

            // Exécution de la requête
            if ($req) {

                $succes = 1;
            } else {

                $succes = 3;
            }
        }
        return $succes;
    }

    public function afficherUtilisateurs()
    {
        // Préparation de la requête de sélection
        $query = $this->db->prepare("SELECT * FROM user");
        $query->execute();
        $resultats = $query->fetchAll(PDO::FETCH_ASSOC);

        return $resultats;
    }


    private function cleanInput($data)
    {
        // Supprime les espaces inutiles en début et fin de chaîne
        $data = trim($data);

        // Supprime les antislashs ajoutés pour échapper les caractères spéciaux
        $data = stripslashes($data);

        // Convertit les caractères spéciaux en entités HTML
        $data = htmlspecialchars($data, ENT_QUOTES | ENT_HTML5, 'UTF-8');

        // Supprime les balises HTML et PHP de la chaîne
        $data = strip_tags($data);

        // Convertit tous les caractères éligibles en entités HTML
        $data = htmlentities($data, ENT_QUOTES | ENT_HTML5, 'UTF-8');

        // Retourne la chaîne nettoyée et sécurisée
        return $data;
    }

    private function decodeInput($data)
    {
        // Convertit toutes les entités HTML en caractères spéciaux
        $data = html_entity_decode($data, ENT_QUOTES | ENT_HTML5, 'UTF-8');

        // Supprime toutes les balises HTML et PHP de la chaîne
        $data = strip_tags($data);

        // Supprime les antislashs ajoutés pour échapper les caractères spéciaux 
        $data = stripslashes($data);

        // Retourne la chaîne riginale
        return $data;
    }


    private function getUtilisateurParEmail($email)
    {
        // Préparation de la requête de sélection
        $query = $this->db->prepare("SELECT * FROM user WHERE email = :email");
        $query->bindParam(':email', $email);
        $query->execute();
        $resultat = $query->fetch(PDO::FETCH_ASSOC);

        return $resultat !== false ? $resultat : false;
    }


    public function supprimerUtilisateur($id)
    {
        // Préparation de la requête de suppression
        $query = $this->db->prepare("DELETE FROM utilisateurs WHERE id = :id");
        $query->bindParam(':id', $id);

        // Exécution de la requête
        if (!$query->execute()) {
            throw new Exception("Une erreur s'est produite lors de la suppression de l'utilisateur");
        }
    }


    public function connecterUtilisateur($email, $password)
    {
        $email = $this->cleanInput($email);
        $utilisateur = $this->getUtilisateurParEmail($email);
        if ($utilisateur === false || !password_verify($password, $utilisateur['passw'])) {
            return false;
        } else {
            return true;
        }
        // return password_verify($password, $utilisateur['passw']);
    }

    public function islogged($email, $password)
    {

        if (!preg_match('/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,12}$/', $_SESSION['Auth']['password']) || !filter_var($_SESSION['Auth']['email'], FILTER_VALIDATE_EMAIL)) {
            return false;
        } else
        if (!isset($_SESSION['Auth']) || !isset($_SESSION['Auth']['password']) || !isset($_SESSION['Auth']['email'])) {
            return false;
        } else
        if (session_status() !== PHP_SESSION_ACTIVE) {
            return false;
        } else {
            $email = $this->cleanInput($email);
            $utilisateur = $this->getUtilisateurParEmail($email);
            if ($utilisateur === false || !password_verify($password, $utilisateur['passw'])) {
                return false;
            } else {
                return true;
            }
        }

        // // Vérifie que l'adresse IP du client n'a pas changé depuis le début de la session
        // if ($_SESSION['ip_address'] !== $_SERVER['REMOTE_ADDR']) {
        //     return false;
        // }

        // // Vérifie que le navigateur de l'utilisateur n'a pas changé depuis le début de la session
        // if ($_SESSION['user_agent'] !== $_SERVER['HTTP_USER_AGENT']) {
        //     return false;
        // }

    }

    static function deconnecterUtilisateur()
    {

        // Démarre une session
        session_start();

        // Détruit toutes les variables de session
        $_SESSION = array();

        // // Supprime le cookie de session
        // if (isset($_COOKIE[session_name()])) {
        //     setcookie(session_name(), '', time() - 42000, '/');
        // }

        // Détruit la session 
        session_destroy();
    }
    // Cette fonction permet de recuperer l Id d'un use 
    static function getParamId()
    {
        if (isset($_GET['id'])) {
            return $_GET['id'];
        } else {
            return null;
        }
    }
}
