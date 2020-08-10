const con = require('../config/database');

con.connect((err) => {
    if (err) {
        console.log('Error connection to database: ', err);
        return
    }
    console.log('Connection established!');
});

exports.showAuhtors = async (req, res) => {
    con.query('SELECT * FROM author', (err, rows) => {
        if (err) throw err;

        res.status(200).send({authors: rows});
    });
}

exports.showBooks = async (req, res) => {
    con.query('SELECT book.title AS book, author.name AS author FROM book INNER JOIN author ON book.author = author.id', (err, rows) => {
        if (err) throw err;

        res.status(200).send({books: rows});
    });
}

exports.saveBook = async (req, res) => {
    con.query('INSERT INTO book SET ?', req.body, (err, b) => {
        if (err) throw err;

        res.status(201).send({message: `New book added: ${b.id}`});
    });
}

exports.saveAuthor = async (req, res) => {
    con.query('INSERT INTO author SET ?', req.body, (err, a) => {
        if (err) throw err;

        res.status(201).send({message: `New author added`});
    });
}