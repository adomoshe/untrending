
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

CREATE TABLE keyWord (
    id INT(5) NOT NULL AUTO_INCREMENT,
    keyWord VARCHAR (20) NOT NULL,
    siteIds VARCHAR(20) NOT NULL,
    PRIMARY KEY (id)
);


INSERT INTO users VALUES ("adomoshe", "Ado", "Moshe");
INSERT INTO categories VALUES (true, false, false, true, true, true, false, false, false);

SELECT * FROM users;
SELECT * FROM categories;

/* Inserts site rating data points */

INSERT INTO ratingSites VALUES ("techcrunch", 5, 9);
INSERT INTO ratingSites VALUES ("abc-news", 5, 9);
INSERT INTO ratingSites VALUES ("bbc", 4, 8);
INSERT INTO ratingSites VALUES ("nbc", 5, 9);
INSERT INTO ratingSites VALUES ("fox-news", 9, 2);
INSERT INTO ratingSites VALUES ("business-insider", 5, 7);
INSERT INTO ratingSites VALUES ("washingtonexaminer", 8, 5);
INSERT INTO ratingSites VALUES ("the-guardian", 4, 7);
INSERT INTO ratingSites VALUES ("techradar", 2, 2);
INSERT INTO ratingSites VALUES ("the-huffington-post", 3, 4);
INSERT INTO ratingSites VALUES ("the-new-york-times", 4, 8);
INSERT INTO ratingSites VALUES ("the-wall-street-journal", 6, 8);
INSERT INTO ratingSites VALUES ("the-washington-post", 4, 7);
INSERT INTO ratingSites VALUES ("the-washington-times", 8, 5);
INSERT INTO ratingSites VALUES ("time", 8, 6);
INSERT INTO ratingSites VALUES ("vice-news", 6, 2);
INSERT INTO ratingSites VALUES ("wired", 3, 5);
INSERT INTO ratingSites VALUES ("reuters", 6, 9);
INSERT INTO ratingSites VALUES ("new-york-post", 7, 3);
INSERT INTO ratingSites VALUES ("national-geographic", 2, 9);
INSERT INTO ratingSites VALUES ("msnbc", 3, 5);
INSERT INTO ratingSites VALUES ("politico", 4, 8);
INSERT INTO ratingSites VALUES ("fortune", 2, 2);
INSERT INTO ratingSites VALUES ("espn", 2, 2);
INSERT INTO ratingSites VALUES ("cbs-news", 6, 8);
INSERT INTO ratingSites VALUES ("cnn", 4, 5);
INSERT INTO ratingSites VALUES ("buzzfeed", 3, 4);
INSERT INTO ratingSites VALUES ("the-economist", 6, 7);
INSERT INTO ratingSites VALUES ("bloomberg", 5, 9);
INSERT INTO ratingSites VALUES ("axios", 4, 8);
INSERT INTO ratingSites VALUES ("associated-press", 2, 2);
INSERT INTO ratingSites VALUES ("national-review", 7, 7);
INSERT INTO ratingSites VALUES ("usa-today", 5, 8);
INSERT INTO ratingSites VALUES ("daily-mail", 7, 2);
INSERT INTO ratingSites VALUES ("the-hill", 7, 8);
INSERT INTO ratingSites VALUES ("cbc", 0, 0);

/* adds key words and association to sites with each key word*/

INSERT INTO keyWord VALUES ("islam", "");
INSERT INTO keyWord VALUES ("middle east", 2);
INSERT INTO keyWord VALUES ("palestine", 2);
INSERT INTO keyWord VALUES ("syria", 2);
INSERT INTO keyWord VALUES ("syrian", 2);
INSERT INTO keyWord VALUES ("gaza", 2);
INSERT INTO keyWord VALUES ("china", 2);
INSERT INTO keyWord VALUES ("foreign", 2);
INSERT INTO keyWord VALUES ("UN", 2);
INSERT INTO keyWord VALUES ("climate", 2);
INSERT INTO keyWord VALUES ("species", 2);
INSERT INTO keyWord VALUES ("border wall", 2);
INSERT INTO keyWord VALUES ("mexico", 2);
INSERT INTO keyWord VALUES ("islam", 2);
