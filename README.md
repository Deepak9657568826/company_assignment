# Simple E-Commerce Application

This is a simple e-commerce application REST API built with Node.js, Express.js, and PostgreSQL. The application supports user authentication, seller functionality (adding, editing, and deleting products), and buyer functionality (searching products and managing a cart).

## Tech Stack

- **Node.js** & **Express.js**: For REST API development.
- **PostgreSQL**: For database management.
- **Libraries**: Various Node.js libraries for authentication, input validation, error handling, and more.

## Features

- **User Authentication**: 
  - Sign up and login functionality.
  - Users can sign up as either a seller or a buyer.
  
- **Seller Functionality**:
  - Add products with details like name, category, description, price, and discount.
  - Edit or delete their products.

- **Buyer Functionality**:
  - Search for products by name or category.
  - Add or remove products from their cart.

## Project Structure

```plaintext
├── config/
│   ├── db.js                   # Database configuration
│   ├── config.js               # App configuration
├── controllers/
│   ├── authController.js       # Handles user authentication (sign-up, login)
│   ├── productController.js    # Handles product-related operations for sellers
│   ├── cartController.js       # Handles cart-related operations for buyers
├── middlewares/
│   ├── authMiddleware.js       # Middleware for authenticating users
│   ├── roleMiddleware.js       # Middleware for role-based access control
│   ├── errorMiddleware.js      # Middleware for global error handling
├── models/
│   ├── userModel.js            # Defines the User schema
│   ├── productModel.js         # Defines the Product schema
│   ├── cartModel.js            # Defines the Cart schema
├── routes/
│   ├── authRoutes.js           # Routes for authentication
│   ├── productRoutes.js        # Routes for product-related operations
│   ├── cartRoutes.js           # Routes for cart-related operations
├── services/
│   ├── authService.js          # Business logic for authentication
│   ├── productService.js       # Business logic for product operations
│   ├── cartService.js          # Business logic for cart operations
├── utils/
│   ├── validator.js            # Input validation utilities
├── .env                        # Environment variables
├── server.js                   # Entry point of the application
├── README.md                   # Documentation of the project

# API Documentation
Authentication
Sign Up
POST /api/auth/signup
Allows a user to sign up as either a seller or a buyer.

Login
POST /api/auth/login
Allows a user to log in.

Seller Operations
Add Product
POST /api/products
Allows a seller to add a new product.

Edit Product
PUT /api/products/:id
Allows a seller to edit an existing product.

Delete Product
DELETE /api/products/:id
Allows a seller to delete a product.

Buyer Operations
Search Products
GET /api/products
Allows a buyer to search for products by name or category.

Add to Cart
POST /api/cart
Allows a buyer to add a product to their cart.

Remove from Cart
DELETE /api/cart/:id
Allows a buyer to remove a product from their cart.

Error Handling
The application includes robust error handling for various scenarios such as invalid input, unauthorized access, and non-existent resources. Error messages are meaningful and clear, and they are returned to the client in a consistent format.