<?php

namespace Database;

use mysqli;

class Database
{
    private static $connection = null;

    public static function get()
    {
        if (self::$connection === null) {
            self::$connection = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
            if (self::$connection->connect_error) {
                die("Connection failed: " . self::$connection->connect_error);
            }
        }
        return self::$connection;
    }

    public static function close()
    {
        if (self::$connection !== null && self::$connection) {
            self::$connection->close();
        }
        self::$connection = null;
    }
};
