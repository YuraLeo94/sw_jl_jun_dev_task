<?php

namespace utils;

class BindHelper
{
    public static function detectBindTypes(array $data): string
    {
        $types = '';
        foreach ($data as $value) {
            $type = gettype($value);

            switch ($type) {
                case 'boolean':
                    $types .= 'i';
                    break;
                case 'integer':
                    $types .= 'i';
                    break;
                case 'double':
                    $types .= 'd';
                    break;
                case 'string':
                default:
                    $types .= 's';
                    break;
            }
        }
        return $types;
    }


    public static function bind($stmt, array $data)
    {
        $params = [];
        $types = self::detectBindTypes($data);

        foreach ($data as &$value) {
            $params[] = &$value;
        }

        array_unshift($params, $types);
        call_user_func_array(array($stmt, 'bind_param'), $params);
    }
}
