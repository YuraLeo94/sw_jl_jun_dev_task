<?php

namespace Model\Products;

use Model\Products\Product;

class Book extends Product
{
    private $weight;


    function __construct($properties)
    {
        parent::__construct($properties);
        $this->weight = $properties['weight'];
    }

    function getNewProductParams(): array
    {
        return [$this->sku, $this->name, $this->price, $this->type, null, $this->weight, null, null, null];
    }

    /**
     * @return array<array<string,string>>
     */
    public function validate(bool $isSkuExist): array
    {
        $messages = $this->validateProduct($isSkuExist);
        if (!$this->validateFloatProperty($this->weight)) {
            $messages['weight'] = INVALID_WEIGHT . " -> " . $this->weight;
        }
        return $messages;
    }
}
