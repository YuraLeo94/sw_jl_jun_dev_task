<?php

namespace Controllers;


class ResponseController
{

    static function response(array $response)
    {
        echo json_encode($response);
    }


    static function getPreparedDataResponseFailed(string $message): array
    {
        return [
            RESPONSE_NAMES['statusKeyName'] => RESPONSE_NAMES['failed'],
            RESPONSE_NAMES['messagesKeyName'] => $message
        ];
    }

    static function getPreparedDataResponseSuccess(string $message): array
    {
        return [
            RESPONSE_NAMES['statusKeyName'] => RESPONSE_NAMES['success'],
            RESPONSE_NAMES['messagesKeyName'] => $message
        ];
    }
}
