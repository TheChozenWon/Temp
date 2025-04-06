BEGIN TRANSACTION;

CREATE TABLE FoodStorage (
    food VARCHAR(30) NOT NULL,
    expiration DATE,
    cost FLOAT,
    food_type VARCHAR(20),
    use_date DATE DEFAULT NULL,
    is_expired BOOLEAN DEFAULT FALSE
);

INSERT INTO FoodStorage (food, expiration, cost, food_type, use_date, is_expired) VALUES
('Apples', '2025-10-01', 1.50, 'Fruit', NULL, FALSE),
('Chicken', '2025-10-05', 5.00, 'Meat', NULL, FALSE),
('Milk', '2025-09-20', 1.20, 'Dairy', NULL, FALSE),
('Bread', '2025-09-15', 2.00, 'Grain', NULL, FALSE),
('Eggs', '2025-09-25', 3.00, 'Dairy', NULL, FALSE),
('Carrots', '2025-10-10', 1.00, 'Vegetable', NULL, FALSE),
('Rice', '2026-01-01', 2.50, 'Grain', NULL, FALSE),
('Fish', '2025-10-12', 7.00, 'Meat', NULL, FALSE),
('Yogurt', '2025-09-30', 0.80, 'Dairy', NULL, FALSE),
('Potatoes', '2025-10-20', 1.50, 'Vegetable', NULL, FALSE),
('Pasta', '2026-02-01', 1.80, 'Grain', NULL, FALSE),
('Cheese', '2025-09-28', 2.50, 'Dairy', NULL, FALSE),
('Broccoli', '2025-10-15', 1.20, 'Vegetable', NULL, FALSE),
('Beef', '2025-10-08', 6.00, 'Meat', NULL, FALSE),
('Bananas', '2025-10-03', 0.60, 'Fruit', NULL, FALSE);
COMMIT;