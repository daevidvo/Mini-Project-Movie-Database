DROP DATABASE IF EXISTS movie_db;
CREATE DATABASE movie_db;

USE movie_db;

CREATE TABLE movie_info (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    movie_name VARCHAR(100) NOT NULL
);

CREATE TABLE review_info (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    review TEXT NOT NULL,
    movie_id INT,
    FOREIGN KEY (movie_id)
    REFERENCES movie_info(id)
);