BEGIN TRANSACTION;

CREATE TABLE Food_storage (
    food VARCHAR(30) NOT NULL,
    expiration DATE;
    cost FLOAT;
    food_type VARCHAR(20)
);

COMMIT;