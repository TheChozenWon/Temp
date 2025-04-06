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
    ('milk', '2025-04-01', 2.50, 'dairy', NULL, 'true'),
    ('bread', '2025-03-30', 1.20, 'grain', NULL, 'true'),
    ('chicken', '2025-04-08', 5.00, 'meat', NULL, 'false'),
    ('spinach', '2025-03-25', 1.80, 'vegetable', NULL, 'true'),
    ('cheese', '2025-04-12', 3.00, 'dairy', NULL, 'false'),
    ('rice', '2025-05-05', 0.80, 'grain', NULL, 'false'),
    ('carrot', '2025-03-28', 0.50, 'vegetable', NULL, 'true'),
    ('beef', '2025-04-10', 7.00, 'meat', NULL, 'false'),
    ('yogurt', '2025-04-03', 1.50, 'dairy', NULL, 'true'),
    ('pasta', '2025-04-25', 1.00, 'grain', NULL, 'false'),
    ('lettuce', '2025-04-04', 0.70, 'vegetable', NULL, 'true'),
    ('fish', '2025-04-15', 6.00, 'meat', NULL, 'false'),
    ('eggplant', '2025-03-27', 1.20, 'vegetable', NULL, 'true'),
    ('butter', '2025-04-06', 2.00, 'dairy', NULL, 'false'),
    ('quinoa', '2025-05-15', 1.50, 'grain', NULL, 'false'),
    ('potato', '2025-04-07', 0.60, 'vegetable', NULL, 'false'),
    ('turkey', '2025-04-20', 8.00, 'meat', NULL, 'false'),
    ('cream', '2025-03-31', 2.50, 'dairy', NULL, 'true'),
    ('oats', '2025-04-30', 1.20, 'grain', NULL, 'false'),
    ('broccoli', '2025-03-29', 1.00, 'vegetable', NULL, 'true'),
    ('sausage', '2025-04-18', 4.50, 'meat', NULL, 'false'),
    ('cereal', '2025-05-25', 2.00, 'grain', NULL, 'false'),
    ('zucchini', '2025-04-02', 0.80, 'vegetable', NULL, 'true'),
    ('ham', '2025-04-28', 5.50, 'meat', NULL, 'false'),
    ('sour cream', '2025-03-26', 1.80, 'dairy', NULL, 'true'),
    ('flour', '2025-06-01', 0.90, 'grain', NULL, 'false'),
    ('cauliflower', '2025-03-24', 1.30, 'vegetable', NULL, 'true'),
    ('bacon', '2025-05-01', 6.50, 'meat', NULL, 'false'),
    ('cream cheese', '2025-04-04', 2.20, 'dairy', NULL, 'true'),
    ('corn', '2025-06-15', 0.70, 'grain', NULL, 'false'),
    ('bell pepper', '2025-03-23', 1.40, 'vegetable', NULL, 'true'),
    ('lamb', '2025-04-30', 9.00, 'meat', NULL, 'false'),
    ('ice cream', '2025-03-28', 3.50, 'dairy', NULL, 'true'),
    ('pancake mix', '2025-06-20', 1.10, 'grain', NULL, 'false'),
    ('asparagus', '2025-03-22', 2.00, 'vegetable', NULL, 'true'),
    ('duck', '2025-05-10', 10.00, 'meat', NULL, 'false'),
    ('whipped cream', '2025-04-01', 2.80, 'dairy', NULL, 'true'),
    ('bread crumbs', '2025-07-01', 1.30, 'grain', NULL, 'false'),
    ('green beans', '2025-04-03', 1.60, 'vegetable', NULL, 'true'),
    ('veal', '2025-05-15', 11.00, 'meat', NULL, 'false'),
    ('cream soda', '2025-03-29', 1.90, 'dairy', NULL, 'true'),
    ('granola', '2025-07-10', 2.50, 'grain', NULL, 'false'),
    ('sweet potato', '2025-03-30', 0.90, 'vegetable', NULL, 'true'),
    ('rabbit', '2025-05-20', 12.00, 'meat', NULL, 'false'),
    ('cheddar cheese', '2025-04-02', 3.20, 'dairy', NULL, 'true'),
    ('couscous', '2025-08-01', 1.70, 'grain', NULL, 'false'),
    ('egg', '2025-03-31', 0.40, 'vegetable', NULL, 'true'),
    ('goat cheese', '2025-04-25', 4.00, 'dairy', NULL, 'false'),
    ('bulgur wheat', '2025-08-15', 1.60, 'grain', NULL, 'false'),
    ('mushroom', '2025-03-26', 1.50, 'vegetable', NULL, 'true'),
    ('pork', '2025-05-05', 7.50, 'meat', NULL, 'false');

COMMIT;