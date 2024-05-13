<?php

namespace Controllers;

use Controllers\ResponseController;
use Exception;
use Services\ProductsService;

class ProductsController
{

    public function create(array $data)
    {
        $types = [
            1 => 'Model\Products\DVD',
            2 => 'Model\Products\Book',
            3 => 'Model\Products\Furniture'
        ];


        try {
            $productType = $data['type'] ?? null;
            if (!isset($types[$productType])) {
                return ResponseController::response(ResponseController::getPreparedDataResponseFailed(INVALID_TYPE));

                throw new Exception(INVALID_TYPE);
            }

            $productClass = $types[$productType];
            $newProduct = new $productClass($data);
            $productsService = new ProductsService(DB_PODUCTS_TABLE_NAME);

            $itemBySku = $productsService->takeEntryBySKU($data['sku']);
            if ($itemBySku[EXEC_RES_INFO_KEY_NAME][RESPONSE_NAMES['statusKeyName']] === RESPONSE_NAMES['failed']) {
                return ResponseController::response($itemBySku[EXEC_RES_INFO_KEY_NAME]);
            }

            $errors = $newProduct->validate(count($itemBySku['item']) > 0);
            if (count($errors) > 0) {
                return ResponseController::response([
                    RESPONSE_NAMES['statusKeyName'] => RESPONSE_NAMES['failed'],
                    RESPONSE_NAMES['errorsKeyName'] => $errors
                ]);
            }

            return ResponseController::response($productsService->add($newProduct->getNewProductParams()));
        } catch (Exception $e) {
            return ResponseController::response(ResponseController::getPreparedDataResponseFailed($e->getMessage()));
        }
    }

    public function get()
    {

        try {
            return ResponseController::response(
                (new ProductsService(DB_PODUCTS_TABLE_NAME))->getAll()
            );
        } catch (Exception $e) {
            return ResponseController::response(ResponseController::getPreparedDataResponseFailed($e->getMessage()));
        }
    }

    public function deleteListOfProducts(array $primaryKeys)
    {

        try {
            return ResponseController::response((new ProductsService(DB_PODUCTS_TABLE_NAME))->deleteListOfProducts($primaryKeys));
        } catch (Exception $e) {
            return ResponseController::response(ResponseController::getPreparedDataResponseFailed($e->getMessage()));
        }
    }
}
