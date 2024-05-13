<?php
include_once('./autoloader.php');
include_once('./config.php');


$router = new Router();

$router->get('/products/get', 'Controllers\ProductsController', 'get');

$router->post('/products/add', 'Controllers\ProductsController', 'create');
$router->post('/products/delete', 'Controllers\ProductsController', 'deleteListOfProducts');

$router->handle();
Database\Database::close();
