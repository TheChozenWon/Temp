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