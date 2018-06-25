DROP TABLE products;

CREATE TABLE products (
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price DEC(10, 2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("HTC EVO 4g", "Cell Phones", 19.99, 4),
("A large dresser", "Furniture", 100, 2),
("Epiphone Casino", "Musical Instruments", 400, 3),
("Bach Stradavarius Trumpet", "Musical Instruments", 1000, 1),
("LG Nexus 5x", "Cell Phones", 100, 1),
("Bookshelf", "Furniture", 30, 10),
("Magic Mouse", "Computer Peripherals", 40, 5),
("Diablo", "Computer Games", 10, 1000),
("A small dresser", "Furniture", 30, 4),
("Air Hockey Table", "Games", 75, 1);