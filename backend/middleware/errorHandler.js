const errorHandler = (err, req, res, next) => {
    var _a, _b;
    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong. Please try again later.";
    if (err.name === "ValidationError") {
        statusCode = 400;
        message = err.message;
    }
    if (err.name === "CastError") {
        statusCode = 400;
        message = "Invalid ID format.";
    }
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
        statusCode = 401;
        message = "Your session has expired or is invalid. Please log in again.";
    }
    if (((_a = err.message) === null || _a === void 0 ? void 0 : _a.includes("ECONNREFUSED")) ||
        ((_b = err.message) === null || _b === void 0 ? void 0 : _b.includes("ENOTFOUND"))) {
        statusCode = 503;
        message = "Service unavailable. Please try again later.";
    }
    res.status(statusCode).json({
        success: false,
        error: message,
    });
};
export default errorHandler;
