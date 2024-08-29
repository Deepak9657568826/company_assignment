const express = require('express');
const cartRoutes = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const {addToCart, removeFromCart, viewCart} = require("../controllers/cartController")
cartRoutes.use(authMiddleware);


cartRoutes.post('/add', addToCart);

cartRoutes.delete('/remove/:productId', removeFromCart);

cartRoutes.get('/', viewCart);

module.exports = cartRoutes;



