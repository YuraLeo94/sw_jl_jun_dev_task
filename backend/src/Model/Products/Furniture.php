<?php

namespace Model\Products;

use Model\Products\Product;

class Furniture extends Product
{
    private $width;
    private $height;
    private $length;


    function __construct($properties)
    {
        parent::__construct($properties);
        $this->width = $properties['width'];
        $this->height = $properties['height'];
        $this->length = $properties['length'];
    }

    public function getNewProductParams(): array
    {
        return [$this->sku, $this->name, $this->price, $this->type, null, null, $this->width, $this->height, $this->length];
    }

    /**
     * @return array<array<string,string>>
     */
    public function validate(bool $isSkuExist): array
    {
        $messages = $this->validateProduct($isSkuExist);
        if (!$this->validateFloatProperty($this->height)) {
            $messages['height'] = INVALID_HEIGHT . " -> " . $this->height;
        }
        if (!$this->validateFloatProperty($this->width)) {
            $messages['width'] = INVALID_WIDTH . " -> " . $this->width;
        }
        if (!$this->validateFloatProperty($this->length)) {
            $messages['length'] = INVALID_LENGTH . " -> " . $this->length;
        }
        return $messages;
    }
}
