require('dotenv').config();
const connection = require('./database');

connection.query(`drop table if exists author`, (err) => {
    if (err) throw err;
});
connection.query(`create table author (
    id int(10) unsigned NOT NULL AUTO_INCREMENT,
    name varchar(50) DEFAULT NULL,
    location varchar(50) DEFAULT NULL,
    PRIMARY KEY (id)
)`, (err) => {
    if (err) throw err;

    console.log('Created author table');
});

connection.query(`drop table if exists book`, (err) => {
    if (err) throw err;
});
connection.query(`create table book (
    id int(10) unsigned NOT NULL AUTO_INCREMENT,
    title varchar(150) DEFAULT NULL,
    author int(10) unsigned NOT NULL,
    PRIMARY KEY (id),
    KEY author (author),
    CONSTRAINT book_ibfk_1 FOREIGN KEY (author) REFERENCES author (id)
)`, (err) => {
    if (err) throw err;

    console.log('Created book table');
});

connection.query(`drop if exists user`, (err) => {
    if (err) throw err;
});
connection.query(`create table user (
    id int(10) unsigned NOT NULL AUTO_INCREMENT,
    name varchar(45) DEFAULT NULL,
    email varchar(100) DEFAULT NULL,
    password varchar(200) DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY id_UNIQUE (id),
    UNIQUE KEY email_UNIQUE (email)
)`, (err) => {
    if (err) throw err;

    console.log('Created user table');
});