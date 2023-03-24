<?php 
require_once('router/routeur.php');

$router= new \router\make\make();
$url =$router->setUrl();
$route = $router->route($url);

?>
