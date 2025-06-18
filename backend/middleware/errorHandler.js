const errorHandler = (err, req, res, next) => {
  console.error("Error :", err);
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err.name == "ValidationError") {
    statusCode = 400;
    message = err.message;
  }
  if (err.name == "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
  }
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Invalid or expired token";
  }
 
  res.status(statusCode).json({
    success: false,
    error: message,
  });
}
export default errorHandler;
