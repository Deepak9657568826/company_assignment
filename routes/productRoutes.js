const express = require('express');
const productRoutes = express.Router();
const {addProduct, editProduct, deleteProduct, getSellerProducts} = require('../controllers/productController');
const {roleMiddleware} = require("../middlewares/roleMiddleware")
const { authMiddleware } = require('../middlewares/authMiddleware');

productRoutes.use(authMiddleware);

productRoutes.post('/add', roleMiddleware('seller')  , addProduct);

productRoutes.put('/update/:id', roleMiddleware('seller'), editProduct);

productRoutes.delete('/delete/:id', roleMiddleware('seller'), deleteProduct);

productRoutes.get('/', getSellerProducts);

module.exports = productRoutes;


// module.exports =  {
//     addProduct, 
//     editProduct, 
//     deleteProduct,
//     getSellerProducts

// }