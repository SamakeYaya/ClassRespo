<?php

namespace router\make;

/**
 * une classe de creation des routes
 */
class make
{

    // creation de la funtion route
    /**
     * cette fontion permet de créer une route
     *
     * @param [string] $url
     * @return void
     */
    public function route($url)
    {
        $filestate = file_exists($url . '.php');
        if ($filestate == 1) {
            return require_once($url . '.php');
        } else {
            return require_once("pages/erreur.php");
        }
    }
    // creation de la function getParam
    /**
     * une fois appelé cette permet d'obtenir un parametre passer en url : exemple | index?450
     * date ce cas le parametre est 450
     *
     * @param [int] $uri
     * @return void
     */
    public function getParam($uri)
    {
        $param = explode('?', $uri);
        return  @$param[1];
    }
    // creation de la session setUrl
    /**
     * cette function est un paliatif a un probleme de url vide 
     * utile pour les fichier index
     * cette function est a appeler dans tous les fichier index  existant dans votre projet
     *
     * @return void
     */

    public function setUrl()
    {
        if (isset($_GET['url'])) {
            return $_GET['url'];
        } else {
            return 'pages/home';
        }
    }
    public function setExecUrl($url)
    {
        $filestate = file_exists($url . '.php');
        if ($filestate == 1) {
            return require_once("pages/erreur.php");
        };
    }
}
