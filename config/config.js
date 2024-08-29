require('dotenv').config();

const config = {
    app: {
        port: process.env.APP_PORT || 1234,
        env: process.env.NODE_ENV || 'development',
    },
    db: {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    },
    auth: {
        jwtSecret: process.env.JWT_SECRET || 'deepak',
        jwtExpiration: process.env.JWT_EXPIRATION || '1h',
    }
};

module.exports = config;
