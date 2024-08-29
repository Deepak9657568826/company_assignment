const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { signup, login } = require('../controllers/authController');

router.post('/signup', signup);

router.post('/login', login);


module.exports = router;
