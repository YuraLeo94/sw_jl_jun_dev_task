<?php

define('INVALID_SKU', 'Invalid SKU or already exists');
define('INVALID_NAME', 'Invalid name');
define('INVALID_PRICE', 'Invalid price');
define('INVALID_TYPE', 'Invalid type');
define('INVALID_SIZE', 'Invalid size');
define('INVALID_WEIGHT', 'Invalid weight');
define('INVALID_HEIGHT', 'Invalid height');
define('INVALID_WIDTH', 'Invalid width');
define('INVALID_LENGTH', 'Invalid length');


define('EXEC_RES_INFO_KEY_NAME', 'execResInfo');
define('PRODUCTS_KEY_NAME', 'products');

define('DB_PODUCTS_TABLE_NAME', 'products');
define('DB_PREP_QUERY_FAILED', 'Query preparation failed: ');
define('DB_QUERY_FAILED', 'Query failed: ');
define('DB_PREPARE_STATEMENT_ISSUE', 'Failed to prepare statement');

define('RESPONSE_NAMES', [
    'statusKeyName' => 'status',
    'messagesKeyName' => 'messages',
    'productsKeyName' => 'products',
    'errorsKeyName' => 'errors',
    'success' => 'success',
    'failed' => 'failed',
    'noErrorsMessage' => 'No errors.',
    'dbErrorMEssage' => 'DB error',
    'productDeltedSuccessMessage' => 'Products deleted successfully.',
    'productDeltedFailedMessage' => 'Failed to delete products.',
    'productRecivedSuccessMessage' => 'Products received successfully.',
    'productAddFailedMessage' => 'Failed to add product.',
    'productAddOkMessage' => 'Product added to the database',
    'bindParamIssueMessage' => 'bind_param method not found on statement object',
    'bindParamMatchIssueMessage' => 'Number of placeholders does not match number of primary keys.',
    'prepareStatementFailedMessage' => 'Failed to prepare statement'

]);