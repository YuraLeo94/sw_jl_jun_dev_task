<?php

namespace Services;

use Controllers\ResponseController;

use Database\Database;
use PDOException;
use Exception;
use utils\BindHelper;

class ProductsService
{

    private $table_name;

    function __construct($table_name)
    {
        $this->table_name = $table_name;
    }

    public function add(array $data): array
    {
        $execResInfo = ResponseController::getPreparedDataResponseSuccess(RESPONSE_NAMES['productAddOkMessage']);

        try {

            $con = Database::get();
            $placeholders = implode(',', array_fill(0, count($data), '?'));
            $query = 'INSERT INTO ' . $this->table_name . " VALUES ($placeholders)";
            $stmt = $con->prepare($query);

            if (!$stmt) {
                return ResponseController::getPreparedDataResponseFailed(RESPONSE_NAMES['prepareStatementFailedMessage']);

                throw new Exception(RESPONSE_NAMES['prepareStatementFailedMessage']);
            }

            if ($stmt && $stmt->param_count != count($data)) {
                return ResponseController::getPreparedDataResponseFailed(RESPONSE_NAMES['bindParamMatchIssueMessage']);
            }

            BindHelper::bind($stmt, $data);

            $success = $stmt->execute();

            if (!$success) {
                $execResInfo = ResponseController::getPreparedDataResponseFailed(RESPONSE_NAMES['productAddFailedMessage']);
            }
        } catch (PDOException $e) {
            $execResInfo = ResponseController::getPreparedDataResponseFailed($e->getMessage());
        } catch (Exception $e) {
            $execResInfo = ResponseController::getPreparedDataResponseFailed($e->getMessage());
        } finally {
            if ($stmt) {
                $stmt->close();
            }
        }

        return $execResInfo;
    }

    public function getAll(): array
    {
        $execResInfo = ResponseController::getPreparedDataResponseSuccess(RESPONSE_NAMES['productRecivedSuccessMessage']);

        $con = Database::get();
        $query = "SELECT * FROM " . $this->table_name;
        $result = mysqli_query($con, $query);
        $products = [];

        if (!$result) {
            $execResInfo = ResponseController::getPreparedDataResponseFailed(mysqli_error($con));

            return array(
                EXEC_RES_INFO_KEY_NAME => $execResInfo,
                RESPONSE_NAMES['productsKeyName'] => $products
            );
            throw new Exception(DB_QUERY_FAILED . mysqli_error($con));
        }
        try {
            while ($row = mysqli_fetch_assoc($result)) {
                $row['price'] = $row['price'] !== null ? (float)$row['price'] : null;
                $row['size'] = $row['size'] !== null ? (int)$row['size'] : null;
                $row['weight'] = $row['weight'] !== null ? (float)$row['weight'] : null;
                $row['width'] = $row['width'] !== null ? (float)$row['width'] : null;
                $row['height'] = $row['height'] !== null ? (float)$row['height'] : null;
                $row['length'] = $row['length'] !== null ? (float)$row['length'] : null;
                $products[] = $row;
            }


            mysqli_free_result($result);
        } catch (Exception $e) {
            $execResInfo = ResponseController::getPreparedDataResponseFailed($e->getMessage());
        }
        return array(EXEC_RES_INFO_KEY_NAME => $execResInfo, PRODUCTS_KEY_NAME => $products);
    }

    public function deleteListOfProducts(array $primaryKeys): array
    {
        $execResInfo = ResponseController::getPreparedDataResponseSuccess(RESPONSE_NAMES['productDeltedSuccessMessage']);

        try {
            $con = Database::get();
            $placeholders = implode(',', array_fill(0, count($primaryKeys), '?'));
            $query = "DELETE FROM " . $this->table_name . " WHERE sku IN ($placeholders)";
            $stmt = $con->prepare($query);

            if (!$stmt) {
                return ResponseController::getPreparedDataResponseFailed(RESPONSE_NAMES['prepareStatementFailedMessage']);

                throw new Exception(RESPONSE_NAMES['prepareStatementFailedMessage']);
            }

            if ($stmt && $stmt->param_count != count($primaryKeys)) {
                return ResponseController::getPreparedDataResponseFailed(RESPONSE_NAMES['bindParamMatchIssueMessage']);
            }

            BindHelper::bind($stmt, $primaryKeys);
            $success = $stmt->execute();

            if (!$success) {
                $execResInfo = ResponseController::getPreparedDataResponseFailed(RESPONSE_NAMES['productDeltedFailedMessage']);
            }
        } catch (PDOException $e) {
            $execResInfo = ResponseController::getPreparedDataResponseFailed($e->getMessage());
        }
        return $execResInfo;
    }

    public function takeEntryBySKU($sku): array
    {
        $con = Database::get();
        $query = "SELECT * FROM " . $this->table_name . " WHERE sku = ?";
        $stmt = mysqli_prepare($con, $query);
        mysqli_stmt_bind_param($stmt, "s", $sku);
        $execResInfo = ResponseController::getPreparedDataResponseSuccess(RESPONSE_NAMES['noErrorsMessage']);

        $item = [];

        if (!$stmt) {
            return [
                EXEC_RES_INFO_KEY_NAME => [
                    ResponseController::getPreparedDataResponseFailed(RESPONSE_NAMES['dbErrorMEssage']),
                ],
                'item' => $item
            ];
            throw new Exception(DB_PREP_QUERY_FAILED . mysqli_error($con));
        }

        try {
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);
            if (mysqli_num_rows($result) > 0) {
                $item = mysqli_fetch_all($result, MYSQLI_ASSOC);
            }
        } catch (Exception $e) {
            $execResInfo = ResponseController::getPreparedDataResponseFailed($e->getMessage());
        } finally {
            mysqli_stmt_close($stmt);
        }

        return [EXEC_RES_INFO_KEY_NAME => $execResInfo, 'item' => $item];
    }
}
