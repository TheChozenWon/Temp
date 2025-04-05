BEGIN TRANSACTION;

CREATE TABLE FoodStorage (
    food VARCHAR(30) NOT NULL,
    expiration DATE,
    cost FLOAT,
    food_type VARCHAR(20)
);

COMMIT;