const express = require('express');
const auth = require('../middleware/authenticate');
const router = express.Router();
const authorController = require('../controllers/AuthorController');
const loginController = require('../controllers/LoginController');
const jwt = require('jsonwebtoken');

router.get('/', (req, res, next) => {
    res.json({'message': 'Ok'}, 200);
});
router.get('/authors', authorController.showAuhtors);
router.get('/books', authorController.showBooks);
router.post('/add/book', auth.authenticate, authorController.saveBook);
router.post('/add/author', auth.authenticate, authorController.saveAuthor);
router.post('/add/user', loginController.registerUser);
router.post('/login', loginController.login);

module.exports = router;