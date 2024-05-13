CREATE DATABASE IF NOT EXISTS scandiweb CHARACTER SET utf8 COLLATE utf8_bin;

USE scandiweb;

CREATE TABLE `products` (
  `sku` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` float NOT NULL,
  `type` int(11) NOT NULL,
  `size` int(11),
  `weight` float,
  `height` float,
  `width` float,
  `length` float
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_bin;

ALTER TABLE `products`
  ADD PRIMARY KEY (`sku`);
COMMIT;

INSERT INTO
  `products` (
    `sku`,
    `name`,
    `price`,
    `type`,
    `size`,
    `weight`,
    `height`,
    `width`,
    `length`
  )
VALUES
  (
    'DVD001',
    'DVD-disc A',
    10,
    1,
    700,
    NULL,
    NULL,
    NULL,
    NULL
  ),
  (
    'DVD002',
    'DVD-disc B',
    12,
    1,
    650,
    NULL,
    NULL,
    NULL,
    NULL
  ),
  (
    'DVD003',
    'DVD-disc C',
    15,
    1,
    800,
    NULL,
    NULL,
    NULL,
    NULL
  ),
  (
    'BOOK001',
    'Book A',
    20,
    2,
    NULL,
    1.2,
    NULL,
    NULL,
    NULL
  ),
  (
    'BOOK002',
    'Book B',
    18,
    2,
    NULL,
    0.8,
    NULL,
    NULL,
    NULL
  ),
  (
    'BOOK003',
    'Book C',
    25,
    2,
    NULL,
    1.5,
    NULL,
    NULL,
    NULL
  ),
  (
    'FURN001',
    'Furniture A',
    150,
    3,
    NULL,
    NULL,
    230,
    110,
    300
  ),
  (
    'FURN002',
    'Furniture B',
    200,
    3,
    NULL,
    NULL,
    260,
    180,
    300
  ),
  (
    'FURN003',
    'Furniture C',
    180,
    3,
    NULL,
    NULL,
    234,
    116,
    300
  );