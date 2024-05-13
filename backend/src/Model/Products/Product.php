<?php

namespace Model\Products;

abstract class Product
{
    protected $sku;
    protected $name;
    protected $price;
    protected $type;

    function __construct($properties)
    {
        $this->sku = $properties['sku'];
        $this->name = $properties['name'];
        $this->price = $properties['price'];
        $this->type = $properties['type'];
    }


    abstract function getNewProductParams(): array;

    private function validateSKU(bool $isExist): bool
    {
        $isValid = !empty($this->sku) && !preg_match('/\s/', $this->sku);

        return $isValid && !$isExist;
    }

    private function validateName(): bool
    {
        return (strlen($this->name) > 0);
    }

    private function validateType(): bool
    {
        return (is_int($this->type) && $this->type >= 1 && $this->type <= 3);
    }

    protected function validateFloatProperty(float $value): bool
    {
        return !(!filter_var($value, FILTER_VALIDATE_FLOAT) || floatval($value) <= 0);
    }

    /**
     * @return array<array<string,string>>
     */
    public function validateProduct(bool $isSkuExist): array
    {
        $messages = array();
        if (!$this->validateSKU($isSkuExist)) {
            $messages['sku'] = INVALID_SKU . "->" . $this->sku;
        }
        if (!$this->validateName()) {
            $messages['name'] = INVALID_NAME . "->" . $this->name;
        }
        if (!$this->validateFloatProperty($this->price)) {
            $messages['price'] = INVALID_PRICE . "->" . $this->price;
        }
        if (!$this->validateType()) {
            $messages['type'] = INVALID_TYPE . "->" . $this->type;
        }
        return $messages;
    }
}
