CREATE DATABASE cardlearn_cards;

CREATE TABLE collections(
    collectionID INT AUTO_INCREMENT PRIMARY KEY,
    userID INT NOT NULL,
    name VARCHAR(255) NOT NULL unique,
    createDate VARCHAR(255) NOT NULL,
    repeatDates VARCHAR(255) NOT NULL
);

CREATE TABLE cards(
    cardID INT AUTO_INCREMENT PRIMARY KEY,
    collectionID INT NOT NULL,
    userID INT NOT NULL,
    frontSide VARCHAR(255) NOT NULL,
    backSide VARCHAR(255) NOT NULL
);