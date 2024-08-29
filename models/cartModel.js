const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');  
const User = require('./userModel');      
const Product = require('./productModel');  

const CartItem = sequelize.define('CartItem', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
}, {
    timestamps: true, 
    tableName: 'cart_items', 
});


CartItem.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
CartItem.belongsTo(Product, { foreignKey: 'productId', onDelete: 'CASCADE' });

User.hasMany(CartItem, { foreignKey: 'userId' });

Product.hasMany(CartItem, { foreignKey: 'productId' });

module.exports = CartItem;
