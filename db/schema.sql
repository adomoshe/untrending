
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

CREATE TABLE ratingSitesUS (
    id INT(5) NOT NULL AUTO_INCREMENT,
    siteId VARCHAR (20) NOT NULL, 
    conservativeRating INT NOT NULL, 
    reliaibityRating INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE foreignAffairSites (
    id INT(5) NOT NULL AUTO_INCREMENT,
    siteId VARCHAR (20) NOT NULL, 
    conservativeRating INT NOT NULL, 
    reliaibityRating INT NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO users VALUES ("adomoshe", "Ado", "Moshe");
INSERT INTO categories VALUES (true, false, false, true, true, true, false, false, false);

SELECT * FROM users;
SELECT * FROM categories;

INSERT INTO ratingSites VALUES ("techcrunch", 2, 2);
INSERT INTO ratingSites VALUES ("abc-news", 2, 2);
INSERT INTO ratingSites VALUES ("bbc", 2, 2);
INSERT INTO ratingSites VALUES ("nbc", 2, 2);
INSERT INTO ratingSites VALUES ("cnn", 2, 2);
INSERT INTO ratingSites VALUES ("fox-news", 2, 2);
INSERT INTO ratingSites VALUES ("business-insider", 2, 2);
INSERT INTO ratingSites VALUES ("cnbc", 2, 2);
INSERT INTO ratingSites VALUES ("washingtonexaminer", 2, 2);
INSERT INTO ratingSites VALUES ("the-guardian", 2, 2);
INSERT INTO ratingSites VALUES ("techradar", 2, 2);
INSERT INTO ratingSites VALUES ("the-huffington-post", 2, 2);
INSERT INTO ratingSites VALUES ("the-new-york-times", 2, 2);
INSERT INTO ratingSites VALUES ("the-wall-street-journal", 2, 2);
INSERT INTO ratingSites VALUES ("the-washington-post", 2, 2);
INSERT INTO ratingSites VALUES ("the-washington-times", 2, 2);
INSERT INTO ratingSites VALUES ("time", 2, 2);
INSERT INTO ratingSites VALUES ("vice-news", 2, 2);
INSERT INTO ratingSites VALUES ("wired", 2, 2);
INSERT INTO ratingSites VALUES ("usa-today", 2, 2);
INSERT INTO ratingSites VALUES ("reuters", 2, 2);
INSERT INTO ratingSites VALUES ("new-york-magazine", 2, 2);
INSERT INTO ratingSites VALUES ("national-geographic", 2, 2);
INSERT INTO ratingSites VALUES ("msnbc", 2, 2);
INSERT INTO ratingSites VALUES ("mashable", 2, 2);
INSERT INTO ratingSites VALUES ("hacker-news", 2, 2);
INSERT INTO ratingSites VALUES ("google-news", 2, 2);
INSERT INTO ratingSites VALUES ("fortune", 2, 2);
INSERT INTO ratingSites VALUES ("espn", 2, 2);
INSERT INTO ratingSites VALUES ("cbs-news", 2, 2);
INSERT INTO ratingSites VALUES ("cnn", 2, 2);
INSERT INTO ratingSites VALUES ("buzzfeed", 2, 2);
INSERT INTO ratingSites VALUES ("business-insider", 2, 2);
INSERT INTO ratingSites VALUES ("bleacher-report", 2, 2);
INSERT INTO ratingSites VALUES ("bloomberg", 2, 2);
INSERT INTO ratingSites VALUES ("axios", 2, 2);
INSERT INTO ratingSites VALUES ("associated-press", 2, 2);
INSERT INTO ratingSites VALUES ("the-guardian", 2, 2);
INSERT INTO ratingSites VALUES ("natonal-review", 2, 2);
INSERT INTO ratingSites VALUES ("usa-today", 2, 2);
INSERT INTO ratingSites VALUES ("daily-mail", 2, 2);
INSERT INTO ratingSites VALUES ("the-hill", 2, 2);
INSERT INTO ratingSites VALUES ("cbc", 2, 2);
INSERT INTO ratingSites VALUES ("the-telegraph", 2, 2);