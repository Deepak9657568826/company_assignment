const Product = require("../models/productModel");


// Add a New Product
exports.addProduct = async (req, res) => {
    const { name, category, description, price, discount } = req.body;
    const sellerId = req.user.id; 

    try {
        // Create a new product
        const newProduct = await Product.create({
            name,
            category,
            description,
            price,
            discount,
            sellerId,
        });

        return res.status(201).json({ message: 'Product added successfully!', product: newProduct });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error.' });
    }
};

// Edit a Product
exports.editProduct = async (req, res) => {
    const { productId } = req.params;
    const { name, category, description, price, discount } = req.body;
    const sellerId = req.user.id; 

    try {
        const product = await Product.findOne({ where: { id: productId, sellerId } });

        if (!product) {
            return res.status(404).json({ message: 'Product not found or unauthorized.' });
        }

        // Update the product details
        product.name = name || product.name;
        product.category = category || product.category;
        product.description = description || product.description;
        product.price = price || product.price;
        product.discount = discount || product.discount;

        await product.save();

        return res.status(200).json({ message: 'Product updated successfully!', product });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error.' });
    }
};

// Delete a Product
exports.deleteProduct = async (req, res) => {
    const { productId } = req.params;
    const sellerId = req.user.id; 

    try {
        const product = await Product.findOne({ where: { id: productId, sellerId } });

        if (!product) {
            return res.status(404).json({ message: 'Product not found or unauthorized.' });
        }

        await product.destroy();

        return res.status(200).json({ message: 'Product deleted successfully!' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error.' });
    }
};

exports.getSellerProducts = async (req, res) => {
    const sellerId = req.user.id; 

    try {
        const products = await Product.findAll({ where: { sellerId } });

        return res.status(200).json({ products });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error.' });
    }
};
