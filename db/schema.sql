
DROP DATABASE IF EXISTS untrending_db;

CREATE DATABASE untrending_db;
USE untrending_db;

CREATE TABLE users (
    id INT(5) NOT NULL AUTO_INCREMENT,
    username VARCHAR(45) NOT NULL,
    firstname VARCHAR(45) NOT NULL,
    lastname VARCHAR(45) NOT NULL,
    date_created DATETIME NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE categories (
    id INT(5) NOT NULL AUTO_INCREMENT,
    world BOOLEAN NOT NULL,
    politics BOOLEAN NOT NULL,
    economy BOOLEAN NOT NULL,
    business BOOLEAN NOT NULL,
    tech BOOLEAN NOT NULL,
    markets BOOLEAN NOT NULL,
    sports BOOLEAN NOT NULL,
    us BOOLEAN NOT NULL,
    entertainment BOOLEAN NOT NULL,
    FOREIGN KEY(users_id) REFERENCES users(id),
    PRIMARY KEY(id)
);

INSERT INTO users VALUES ("sherrielin", "Sherrie", "Lin");
INSERT INTO categories VALUES (true, false, false, true, true, true, false, false, false);

SELECT * FROM users;
SELECT * FROM categories;