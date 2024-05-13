<?php

namespace Model\Products;

use Model\Products\Product;

class DVD extends Product
{
    private $size;


    function __construct($properties)
    {
        parent::__construct($properties);
        $this->size = $properties['size'];
    }

    public function getNewProductParams(): array
    {
        return [$this->sku, $this->name, $this->price, $this->type, $this->size, null, null, null, null];
    }

    private function validateSize(): bool
    {
        return is_numeric($this->size);
    }

    /**
     * @return array<array<string,string>>
     */
    public function validate(bool $isSkuExist): array
    {
        $messages = $this->validateProduct($isSkuExist);
        if (!$this->validateSize()) {
            $messages['size'] = INVALID_SIZE;
        }
        return $messages;
    }
}
