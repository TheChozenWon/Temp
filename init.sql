BEGIN TRANSACTION;

CREATE TABLE FoodStorage (
    food VARCHAR(30) NOT NULL,
    expiration DATE,
    cost FLOAT,
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

INSERT INTO FoodStorage (food, expiration, cost, food_type, use_date, is_expired)
VALUES
    ('milk', '2025-04-01', 2.50, 'dairy', '2025-03-20', 'true'),
    ('bread', '2025-04-03', 1.20, 'grain', '2025-03-15', 'true'),
    ('chicken', '2025-04-08', 5.00, 'meat', NULL, 'false'),
    ('spinach', '2025-03-25', 1.80, 'vegetable', '2025-03-10', 'true'),
    ('cheese', '2025-04-12', 3.00, 'dairy', NULL, 'false'),
    ('rice', '2025-04-20', 0.80, 'grain', '2025-03-25', 'false'),
    ('carrot', '2025-04-02', 0.50, 'vegetable', NULL, 'true'),
    ('beef', '2025-04-10', 7.00, 'meat', NULL, 'false'),
    ('yogurt', '2025-04-05', 1.50, 'dairy', '2025-03-18', 'true'),
    ('pasta', '2025-04-25', 1.00, 'grain', NULL, 'false'),
    ('lettuce', '2025-04-04', 0.70, 'vegetable', '2025-03-22', 'true'),
    ('fish', '2025-04-15', 6.00, 'meat', NULL, 'false'),
    ('eggplant', '2025-03-27', 1.20, 'vegetable', '2025-03-12', 'true'),
    ('butter', '2025-04-06', 2.00, 'dairy', NULL, 'false'),
    ('quinoa', '2025-04-28', 1.50, 'grain', NULL, 'false'),
    ('potato', '2025-04-07', 0.60, 'vegetable', '2025-03-30', 'false'),
    ('turkey', '2025-04-20', 8.00, 'meat', NULL, 'false'),
    ('cream', '2025-04-01', 2.50, 'dairy', '2025-03-17', 'true'),
    ('oats', '2025-04-30', 1.20, 'grain', NULL, 'false'),
    ('broccoli', '2025-03-29', 1.00, 'vegetable', '2025-03-14', 'true'),
    ('sausage', '2025-04-18', 4.50, 'meat', NULL, 'false'),
    ('cereal', '2025-04-25', 2.00, 'grain', NULL, 'false'),
    ('zucchini', '2025-04-02', 0.80, 'vegetable', '2025-03-20', 'true'),
    ('ham', '2025-04-28', 5.50, 'meat', NULL, 'false'),
    ('sour cream', '2025-03-26', 1.80, 'dairy', '2025-03-11', 'true'),
    ('flour', '2025-04-30', 0.90, 'grain', NULL, 'false'),
    ('cauliflower', '2025-03-24', 1.30, 'vegetable', '2025-03-09', 'true'),
    ('bacon', '2025-04-05', 6.50, 'meat', NULL, 'false'),
    ('cream cheese', '2025-04-04', 2.20, 'dairy', '2025-03-21', 'true'),
    ('corn', '2025-04-15', 0.70, 'grain', NULL, 'false'),
    ('bell pepper', '2025-03-23', 1.40, 'vegetable', '2025-03-08', 'true'),
    ('lamb', '2025-04-30', 9.00, 'meat', NULL, 'false'),
    ('ice cream', '2025-03-28', 3.50, 'dairy', '2025-03-13', 'true'),
    ('pancake mix', '2025-04-20', 1.10, 'grain', NULL, 'false'),
    ('asparagus', '2025-03-22', 2.00, 'vegetable', '2025-03-07', 'true'),
    ('duck', '2025-04-25', 10.00, 'meat', NULL, 'false'),
    ('whipped cream', '2025-04-01', 2.80, 'dairy', '2025-03-19', 'true'),
    ('bread crumbs', '2025-04-30', 1.30, 'grain', NULL, 'false'),
    ('green beans', '2025-04-03', 1.60, 'vegetable', '2025-03-16', 'true'),
    ('veal', '2025-04-28', 11.00, 'meat', NULL, 'false'),
    ('cream soda', '2025-03-29', 1.90, 'dairy', '2025-03-14', 'true'),
    ('granola', '2025-04-25', 2.50, 'grain', NULL, 'false'),
    ('sweet potato', '2025-03-30', 0.90, 'vegetable', '2025-03-15', 'true'),
    ('rabbit', '2025-04-20', 12.00, 'meat', NULL, 'false'),
    ('cheddar cheese', '2025-04-02', 3.20, 'dairy', '2025-03-18', 'true'),
    ('couscous', '2025-04-30', 1.70, 'grain', NULL, 'false'),
    ('egg', '2025-03-31', 0.40, 'vegetable', '2025-03-16', 'true'),
    ('goat cheese', '2025-04-25', 4.00, 'dairy', NULL, 'false'),
    ('bulgur wheat', '2025-04-30', 1.60, 'grain', NULL, 'false'),
    ('mushroom', '2025-03-26', 1.50, 'vegetable', '2025-03-11', 'true'),
    ('pork', '2025-04-05', 7.50, 'meat', NULL, 'false');

COMMIT;