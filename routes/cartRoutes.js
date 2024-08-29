const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware.authenticate);


router.post('/add', cartController.addToCart);

router.delete('/remove/:productId', cartController.removeFromCart);

router.get('/', cartController.getCartItems);

module.exports = router;
