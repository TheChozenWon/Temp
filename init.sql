BEGIN TRANSACTION;

CREATE TABLE FoodStorage (
    food VARCHAR(30) NOT NULL,
    expiration DATE NOT NULL,
    quantity INTEGER DEFAULT 1 NOT NULL,
    food_type VARCHAR(20) NOT NULL,
    use_date DATE DEFAULT NULL
);

CREATE VIEW FoodStorageView AS
SELECT *,
    expiration < DATE('now') AND use_date IS NULL AS is_expired
FROM FoodStorage;

INSERT INTO FoodStorage (food, expiration, quantity, food_type, use_date) VALUES
('milk', '2025-04-01', 10, 'dairy', NULL),
('bread', '2025-03-30', 5, 'grain', NULL),
('chicken', '2025-04-08', 3, 'meat', NULL),
('spinach', '2025-03-25', 8, 'vegetable', NULL),
('cheese', '2025-04-12', 4, 'dairy', NULL),
('rice', '2025-05-05', 20, 'grain', NULL),
('carrot', '2025-03-28', 15, 'vegetable', NULL),
('beef', '2025-04-10', 2, 'meat', NULL),
('yogurt', '2025-04-03', 6, 'dairy', NULL),
('pasta', '2025-04-25', 12, 'grain', NULL),
('lettuce', '2025-04-04', 7, 'vegetable', NULL),
('fish', '2025-04-15', 4, 'meat', NULL),
('eggplant', '2025-03-27', 9, 'vegetable', NULL),
('butter', '2025-04-06', 3, 'dairy', NULL),
('quinoa', '2025-05-15', 10, 'grain', NULL),
('potato', '2025-04-07', 25, 'vegetable', NULL),
('turkey', '2025-04-20', 1, 'meat', NULL),
('cream', '2025-03-31', 5, 'dairy', NULL),
('oats', '2025-04-30', 18, 'grain', NULL),
('broccoli', '2025-03-29', 6, 'vegetable', NULL),
('sausage', '2025-04-18', 3, 'meat', NULL),
('cereal', '2025-05-25', 10, 'grain', NULL),
('zucchini', '2025-04-02', 8, 'vegetable', NULL),
('ham', '2025-04-28', 2, 'meat', NULL),
('sour cream', '2025-03-26', 4, 'dairy', NULL),
('flour', '2025-06-01', 15, 'grain', NULL),
('cauliflower', '2025-03-24', 5, 'vegetable', NULL),
('bacon', '2025-05-01', 3, 'meat', NULL),
('cream cheese', '2025-04-04', 6, 'dairy', NULL),
('corn', '2025-06-15', 20, 'grain', NULL),
('bell pepper', '2025-03-23', 10, 'vegetable', NULL),
('lamb', '2025-04-30', 2, 'meat', NULL),
('ice cream', '2025-03-28', 7, 'dairy', NULL),
('pancake mix', '2025-06-20', 8, 'grain', NULL),
('asparagus', '2025-03-22', 5, 'vegetable', NULL),
('duck', '2025-05-10', 1, 'meat', NULL),
('whipped cream', '2025-04-01', 4, 'dairy', NULL),
('bread crumbs', '2025-07-01', 12, 'grain', NULL),
('green beans', '2025-04-03', 9, 'vegetable', NULL),
('veal', '2025-05-15', 1, 'meat', NULL),
('cream soda', '2025-03-29', 6, 'dairy', NULL),
('granola', '2025-07-10', 10, 'grain', NULL),
('sweet potato', '2025-03-30', 14, 'vegetable', NULL),
('rabbit', '2025-05-20', 1, 'meat', NULL),
('cheddar cheese', '2025-04-02', 5, 'dairy', NULL),
('couscous', '2025-08-01', 10, 'grain', NULL),
('egg', '2025-03-31', 30, 'vegetable', NULL),
('goat cheese', '2025-04-25', 3, 'dairy', NULL),
('bulgur wheat', '2025-08-15', 8, 'grain', NULL),
('mushroom', '2025-03-26', 10, 'vegetable', NULL),
('pork', '2025-05-05', 2, 'meat', NULL);

COMMIT;