const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

// Function to add a product to the cart
const addToCart = async (userId, productId, quantity) => {
    try {
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error('Product not found');
        }

        let cart = await Cart.findOne({ userId });
        
        if (!cart) {
            cart = new Cart({
                userId,
                items: []
            });
        }

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        const updatedCart = await cart.save();

        return updatedCart;
    } catch (error) {
        throw new Error('Error adding to cart: ' + error.message);
    }
};

// Function to remove a product from the cart
const removeFromCart = async (userId, productId) => {
    try {
        const cart = await Cart.findOne({ userId });
        
        if (!cart) {
            throw new Error('Cart not found');
        }

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        
        if (itemIndex === -1) {
            throw new Error('Product not found in cart');
        }

        cart.items.splice(itemIndex, 1);

        const updatedCart = await cart.save();

        return updatedCart;
    } catch (error) {
        throw new Error('Error removing from cart: ' + error.message);
    }
};

// Function to update the quantity of a product in the cart
const updateCartQuantity = async (userId, productId, quantity) => {
    try {
        const cart = await Cart.findOne({ userId });
        
        if (!cart) {
            throw new Error('Cart not found');
        }

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        
        if (itemIndex === -1) {
            throw new Error('Product not found in cart');
        }

        cart.items[itemIndex].quantity = quantity;

        const updatedCart = await cart.save();

        return updatedCart;
    } catch (error) {
        throw new Error('Error updating cart quantity: ' + error.message);
    }
};

// Function to get the user's cart
const getCart = async (userId) => {
    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        
        if (!cart) {
            throw new Error('Cart not found');
        }

        return cart;
    } catch (error) {
        throw new Error('Error fetching cart: ' + error.message);
    }
};

module.exports = {
    addToCart,
    removeFromCart,
    updateCartQuantity,
    getCart
};
