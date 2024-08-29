const Product = require('../models/productModel');

// Function to add a new product
const addProduct = async (productData) => {
    try {
        const newProduct = new Product({
            name: productData.name,
            category: productData.category,
            description: productData.description,
            price: productData.price,
            discount: productData.discount,
            sellerId: productData.sellerId 
        });

        const savedProduct = await newProduct.save();

        return savedProduct;
    } catch (error) {
        throw new Error('Error adding product: ' + error.message);
    }
};

// Function to update an existing product
const updateProduct = async (productId, updateData) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            throw new Error('Product not found');
        }

        return updatedProduct;
    } catch (error) {
        throw new Error('Error updating product: ' + error.message);
    }
};

// Function to delete a product
const deleteProduct = async (productId) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            throw new Error('Product not found');
        }

        return deletedProduct;
    } catch (error) {
        throw new Error('Error deleting product: ' + error.message);
    }
};

// Function to get all products
const getAllProducts = async () => {
    try {
        const products = await Product.find();

        return products;
    } catch (error) {
        throw new Error('Error fetching products: ' + error.message);
    }
};

// Function to get products by category
const getProductsByCategory = async (category) => {
    try {
        const products = await Product.find({ category });

        return products;
    } catch (error) {
        throw new Error('Error fetching products by category: ' + error.message);
    }
};

// Function to get a product by ID
const getProductById = async (productId) => {
    try {
        const product = await Product.findById(productId);

        if (!product) {
            throw new Error('Product not found');
        }

        return product;
    } catch (error) {
        throw new Error('Error fetching product: ' + error.message);
    }
};

module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getProductsByCategory,
    getProductById
};
