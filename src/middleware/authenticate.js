const con = require('../config/database');
const jwt = require('jsonwebtoken');

exports.authenticate = async (req, res, next) => {
    var token = req.headers['x-access-token'];

    if (!token) {
        return res.status(401).send({auth: false, message: 'No token provided'});
    }

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

        req.userId = decoded.id;
        next();
    });
}