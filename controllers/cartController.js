const CartItem = require("../models/cartModel");
const Product = require("../models/productModel");

// Add a Product to Cart
const addToCart = async (req, res) => {
    const { productId } = req.body;
    const buyerId = req.user.id;

    try {
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        const existingCartItem = await CartItem.findOne({ where: { buyerId, productId } });

        if (existingCartItem) {
            return res.status(400).json({ message: 'Product is already in your cart.' });
        }

        const cartItem = await CartItem.create({ buyerId, productId });

        return res.status(201).json({ message: 'Product added to cart successfully!', cartItem });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error.' });
    }
};

// Remove a Product from Cart
const removeFromCart = async (req, res) => {
    const { productId } = req.params;
    const buyerId = req.user.id; 

    try {
        const cartItem = await CartItem.findOne({ where: { buyerId, productId } });

        if (!cartItem) {
            return res.status(404).json({ message: 'Product not found in your cart.' });
        }

        await cartItem.destroy();

        return res.status(200).json({ message: 'Product removed from cart successfully!' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error.' });
    }
};

// View Cart
const viewCart = async (req, res) => {
    const buyerId = req.user.id; 

    try {
        const cartItems = await CartItem.findAll({
            where: { buyerId },
            include: [{ model: Product, attributes: ['name', 'category', 'description', 'price', 'discount'] }]
        });

        if (!cartItems.length) {
            return res.status(200).json({ message: 'Your cart is empty.', cartItems: [] });
        }

        return res.status(200).json({ cartItems });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error.' });
    }
};

module.exports = {
    addToCart, 
    removeFromCart, 
    viewCart
}
