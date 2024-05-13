<?php

$defaultOrigin = 'https://juniortest2-jurijs-leonovics.000webhostapp.com';
$allowedOrigins = [
    'http://localhost:3000',
    $defaultOrigin
];
$allowedHeaders = ['Content-Type'];
$allowedMethods = ['OPTIONS', 'GET', 'POST', 'DELETE'];

$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : null;


if ($origin === null || in_array($origin, $allowedOrigins)) {
    header('Access-Control-Allow-Origin: ' . ($origin !== null ? $origin : $defaultOrigin));
    header('Access-Control-Allow-Credentials: true');
} else {
    header('HTTP/1.1 403 Forbidden');
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: ' . implode(', ', $allowedMethods));
    header('Access-Control-Allow-Headers: ' . implode(', ', $allowedHeaders));
    exit();
}

if (!in_array($_SERVER['REQUEST_METHOD'], $allowedMethods)) {
    header('HTTP/1.1 405 Method Not Allowed');
    exit();
}

header('Content-Type: application/json');
