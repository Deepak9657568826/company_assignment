
const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);

    res.status(err.statusCode || 500);

    res.json({
        success: false,
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

module.exports = {errorMiddleware};
