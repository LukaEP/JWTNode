const con = require('../config/database');
const jwt = require('jsonwebtoken');
const hash = require('object-hash');

exports.registerUser = async (req, res) => {
    let user = {'name': req.body.name, 'email': req.body.email, 'password': hash(req.body.password)};

    con.query('INSERT INTO user SET ?', user, (errQuery, u) => {
        if (errQuery) {
            res.status(500).send({message: errQuery});
        }

        res.status(201).send({message: `New user added: ${u}`});
    });
}

exports.login = async (req, res) => {
    con.query('SELECT * FROM user WHERE email = ?', [req.body.email], (err, result) => {
        if (err) throw err;
        
        try {
            if (hash(req.body.password) === result[0].password) {
                var token = jwt.sign({id: result[0].id}, process.env.SECRET, {
                    expiresIn: '1h'
                });
                res.status(200).send({user: result[0], token: token});
            } else {
                res.status(400).send({message: 'Wrong password'});
            }
        } catch (error) {
            res.status(400).send({message: 'User not found'});
        }
    });
}