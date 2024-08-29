const { body, validationResult } = require('express-validator');

// Validation for user sign-up
const validateSignUp = [
    body('username')
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('role')
        .notEmpty().withMessage('Role is required')
        .isIn(['buyer', 'seller']).withMessage('Invalid role'),
];

// Validation for user login
const validateLogin = [
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),
    body('password')
        .notEmpty().withMessage('Password is required'),
];

// Validation for product creation
const validateProductCreation = [
    body('name')
        .notEmpty().withMessage('Product name is required'),
    body('category')
        .notEmpty().withMessage('Category is required')
        .isIn(['clothes', 'shoes', 'electronics', 'accessories']).withMessage('Invalid category'),
    body('description')
        .notEmpty().withMessage('Description is required'),
    body('price')
        .isNumeric().withMessage('Price must be a number')
        .notEmpty().withMessage('Price is required'),
    body('discount')
        .optional()
        .isNumeric().withMessage('Discount must be a number'),
];

// Validation for adding a product to the cart
const validateAddToCart = [
    body('productId')
        .notEmpty().withMessage('Product ID is required'),
    body('quantity')
        .isInt({ gt: 0 }).withMessage('Quantity must be a positive integer')
        .notEmpty().withMessage('Quantity is required'),
];

// Function to check validation results
const checkValidationResults = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateSignUp,
    validateLogin,
    validateProductCreation,
    validateAddToCart,
    checkValidationResults
};
