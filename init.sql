BEGIN TRANSACTION;

CREATE TABLE FoodStorage (
    food VARCHAR(30) NOT NULL,
    expiration DATE,
    cost FLOAT,
    food_type VARCHAR(20)
);

INSERT INTO FoodStorage (food, expiration, cost, food_type) VALUES
('Apples', '2026-10-01', 1.50, 'Fruit'),
('Bread', '2026-09-15', 2.00, 'Grain'),
('Chicken', '2026-10-05', 5.00, 'Meat'),
('Milk', '2026-09-20', 1.20, 'Dairy'),
('Carrots', '2026-10-10', 0.80, 'Vegetable');

COMMIT;