const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');  
const User = require('./userModel');       
const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    discount: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        defaultValue: 0.00,
    },
    sellerId: {
        type: DataTypes.INTEGER,
        references: {
            model: User, 
            key: 'id',
        },
        allowNull: false,
    },
}, {
    timestamps: true, 
    tableName: 'products',
});

Product.belongsTo(User, { foreignKey: 'sellerId' });
User.hasMany(Product, { foreignKey: 'sellerId' });

module.exports = Product;
