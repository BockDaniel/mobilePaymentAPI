DROP DATABASE IF EXISTS MobileTransactionsApp;
CREATE DATABASE IF NOT EXISTS MobileTransactionsApp;
USE MobileTransactionsApp;

DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    userID INT NOT NULL PRIMARY KEY auto_increment,
    fullName VARCHAR(100) NOT NULL,
    contact VARCHAR(200) NOT NULL,
    userPassword VARCHAR(254) NOT NULL,
    lastUpdated TIMESTAMP DEFAULT current_timestamp
);

DROP TABLE wallet IF EXISTS;

CREATE TABLE wallet IF NOT EXISTS (
    walletID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    userID INT NOT NULL REFERENCES users(UserID),
    walletAmt VARCHAR(50) NOT NULL,
    lastUpdated TIMESTAMP NOT NULL DEFAULT current_timestamp
);

DROP TABLE transactions IF EXISTS;

CREATE TABLE transactions IF NOT EXISTS (
    transactionsID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    senderID INT NOT NULL REFERENCES users(UserID),
    receiverID INT NOT NULL REFERENCES users(UserID),
    transactionStatus INT NOT NULL DEFAULT 0,
    transactionType INT NOT NULL DEFAULT 0,
    lastUpdated TIMESTAMP NOT NULL DEFAULT current_timestamp
)