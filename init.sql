BEGIN TRANSACTION;

CREATE TABLE FoodStorage (
    food VARCHAR(30) NOT NULL,
    expiration DATE,
    quantity INTEGER DEFAULT 1,
    food_type VARCHAR(20),
    use_date DATE DEFAULT NULL,
    is_expired BOOLEAN DEFAULT NULL
);

CREATE TRIGGER UpdateIsExpiredBeforeInsert
BEFORE INSERT ON FoodStorage
FOR EACH ROW
BEGIN
    SELECT NEW.is_expired = NEW.expiration < DATE('now');
END;

CREATE TRIGGER UpdateIsExpiredBeforeUpdate
BEFORE UPDATE OF expiration ON FoodStorage
FOR EACH ROW
BEGIN
    SELECT NEW.is_expired = NEW.expiration < DATE('now');
END;

INSERT INTO FoodStorage (food, expiration, quantity, food_type, use_date, is_expired) VALUES
('milk', '2025-04-01', 10, 'dairy', NULL, 'true'),
('bread', '2025-03-30', 5, 'grain', NULL, 'true'),
('chicken', '2025-04-08', 3, 'meat', NULL, 'false'),
('spinach', '2025-03-25', 8, 'vegetable', NULL, 'true'),
('cheese', '2025-04-12', 4, 'dairy', NULL, 'false'),
('rice', '2025-05-05', 20, 'grain', NULL, 'false'),
('carrot', '2025-03-28', 15, 'vegetable', NULL, 'true'),
('beef', '2025-04-10', 2, 'meat', NULL, 'false'),
('yogurt', '2025-04-03', 6, 'dairy', NULL, 'true'),
('pasta', '2025-04-25', 12, 'grain', NULL, 'false'),
('lettuce', '2025-04-04', 7, 'vegetable', NULL, 'true'),
('fish', '2025-04-15', 4, 'meat', NULL, 'false'),
('eggplant', '2025-03-27', 9, 'vegetable', NULL, 'true'),
('butter', '2025-04-06', 3, 'dairy', NULL, 'false'),
('quinoa', '2025-05-15', 10, 'grain', NULL, 'false'),
('potato', '2025-04-07', 25, 'vegetable', NULL, 'false'),
('turkey', '2025-04-20', 1, 'meat', NULL, 'false'),
('cream', '2025-03-31', 5, 'dairy', NULL, 'true'),
('oats', '2025-04-30', 18, 'grain', NULL, 'false'),
('broccoli', '2025-03-29', 6, 'vegetable', NULL, 'true'),
('sausage', '2025-04-18', 3, 'meat', NULL, 'false'),
('cereal', '2025-05-25', 10, 'grain', NULL, 'false'),
('zucchini', '2025-04-02', 8, 'vegetable', NULL, 'true'),
('ham', '2025-04-28', 2, 'meat', NULL, 'false'),
('sour cream', '2025-03-26', 4, 'dairy', NULL, 'true'),
('flour', '2025-06-01', 15, 'grain', NULL, 'false'),
('cauliflower', '2025-03-24', 5, 'vegetable', NULL, 'true'),
('bacon', '2025-05-01', 3, 'meat', NULL, 'false'),
('cream cheese', '2025-04-04', 6, 'dairy', NULL, 'true'),
('corn', '2025-06-15', 20, 'grain', NULL, 'false'),
('bell pepper', '2025-03-23', 10, 'vegetable', NULL, 'true'),
('lamb', '2025-04-30', 2, 'meat', NULL, 'false'),
('ice cream', '2025-03-28', 7, 'dairy', NULL, 'true'),
('pancake mix', '2025-06-20', 8, 'grain', NULL, 'false'),
('asparagus', '2025-03-22', 5, 'vegetable', NULL, 'true'),
('duck', '2025-05-10', 1, 'meat', NULL, 'false'),
('whipped cream', '2025-04-01', 4, 'dairy', NULL, 'true'),
('bread crumbs', '2025-07-01', 12, 'grain', NULL, 'false'),
('green beans', '2025-04-03', 9, 'vegetable', NULL, 'true'),
('veal', '2025-05-15', 1, 'meat', NULL, 'false'),
('cream soda', '2025-03-29', 6, 'dairy', NULL, 'true'),
('granola', '2025-07-10', 10, 'grain', NULL, 'false'),
('sweet potato', '2025-03-30', 14, 'vegetable', NULL, 'true'),
('rabbit', '2025-05-20', 1, 'meat', NULL, 'false'),
('cheddar cheese', '2025-04-02', 5, 'dairy', NULL, 'true'),
('couscous', '2025-08-01', 10, 'grain', NULL, 'false'),
('egg', '2025-03-31', 30, 'vegetable', NULL, 'true'),
('goat cheese', '2025-04-25', 3, 'dairy', NULL, 'false'),
('bulgur wheat', '2025-08-15', 8, 'grain', NULL, 'false'),
('mushroom', '2025-03-26', 10, 'vegetable', NULL, 'true'),
('pork', '2025-05-05', 2, 'meat', NULL, 'false');

COMMIT;