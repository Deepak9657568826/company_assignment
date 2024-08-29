const express = require('express');
const authrouter = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { signup, login } = require('../controllers/authController');

authrouter.post('/signup', signup);

authrouter.post('/login', login);


module.exports = authrouter;
