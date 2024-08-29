const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const config = require('../config/config');

// Function to register a new user
const registerUser = async (userData) => {
    try {
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        // Create a new user instance
        const newUser = new User({
            name: userData.name,
            email: userData.email,
            password: hashedPassword,
            role: userData.role 
        });

        const savedUser = await newUser.save();

        return savedUser;
    } catch (error) {
        throw new Error('Error registering user: ' + error.message);
    }
};

// Function to authenticate a user
const authenticateUser = async (email, password) => {
    try {
        const user = await User.findOne({ email });

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                { userId: user._id, role: user.role },
                config.jwtSecret,
                { expiresIn: '1h' } 
            );

            return { token, user };
        } else {
            throw new Error('Invalid credentials');
        }
    } catch (error) {
        throw new Error('Error authenticating user: ' + error.message);
    }
};

// Function to get user by ID
const getUserById = async (userId) => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    } catch (error) {
        throw new Error('Error fetching user: ' + error.message);
    }
};

module.exports = {
    registerUser,
    authenticateUser,
    getUserById
};
