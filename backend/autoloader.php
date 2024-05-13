<?php
spl_autoload_register(function ($className) {
    $baseDir = __DIR__ . '/src/';

    $className = str_replace('\\', '/', $className);
    $file = $baseDir . $className . '.php';

    if (file_exists($file)) {
        require $file;
    }
});

require_once('./Router.php');
require_once('./src/utils/consts/dictionary.consts.php');
require_once('./corePolicy.php');
