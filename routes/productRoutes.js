const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.use(authMiddleware.authenticate);
router.post('/add', roleMiddleware.checkRole('seller'), productController.addProduct);

router.put('/update/:id', roleMiddleware.checkRole('seller'), productController.updateProduct);

router.delete('/delete/:id', roleMiddleware.checkRole('seller'), productController.deleteProduct);

router.get('/', productController.getAllProducts);

router.get('/:id', productController.getProductById);

module.exports = router;
