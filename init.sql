BEGIN TRANSACTION;

CREATE TABLE FoodStorage (
    food VARCHAR(30) NOT NULL,
    expiration DATE,
    cost FLOAT,
    food_type VARCHAR(20)
    use_date DATE DEFAULT NULL,
    is_expired BOOLEAN DEFAULT FALSE
);

INSERT INTO FoodStorage (food, expiration, cost, food_type, use_date, is_expired) VALUES
('Apples', '2025-10-01', 1.50, 'Fruit', NULL, FALSE),
('Chicken', '2025-10-05', 5.00, 'Meat', NULL, FALSE),
('Milk', '2025-09-20', 1.20, 'Dairy', NULL, FALSE),

COMMIT;