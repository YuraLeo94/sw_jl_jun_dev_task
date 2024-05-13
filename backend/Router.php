<?php

class Router
{
    private $path = [];

    public function get(string $path, string $controller, $action)
    {
        $this->path[] = [
            'path' => $path,
            'controller' => $controller,
            'action' => $action,
            'method' => 'get'
        ];
    }

    public function post(string $path, string $controller, $action)
    {
        $this->path[] = [
            'path' => $path,
            'controller' => $controller,
            'action' => $action,
            'method' => 'post'
        ];
    }

    public function handle()
    {
        $pathInfo = isset($_SERVER['PATH_INFO']) ? htmlspecialchars($_SERVER['PATH_INFO']) : '';
        $key = array_search($pathInfo, array_column($this->path, 'path'));

        if ($key !== false) {
            $method = $this->path[$key]['method'];
            $controller = $this->path[$key]['controller'];
            $action = $this->path[$key]['action'];

            if ($method === 'get') {
                return (new $controller)->{$action}();
            } else {
                $jsonData = file_get_contents('php://input');
                $data = json_decode($jsonData, true);
                return (new $controller)->{$action}($data);
            }
        } else {
            header('HTTP/1.1 404 Not Found');
            echo '404 Not Found';
            exit();
        }
    }
}
