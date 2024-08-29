const { Sequelize } = require('sequelize');

// Create a new instance of Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false, // Disable logging; you can enable this for debugging purposes
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // Necessary for some hosted PostgreSQL services
        }
    }
});

// Test the database connection
sequelize.authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;
