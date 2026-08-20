const errorMiddleware = (error, req, res, next) => {
  console.error("ERROR:", error);

  // Default error
  let statusCode = error.statusCode || 500;
  let message = error.message || "Internal Server Error";

  // MongoDB Invalid ObjectId
  if (error.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID";
  }

  // MongoDB Duplicate Key
  if (error.code === 11000) {
    statusCode = 409;
    message = "Duplicate value already exists";
  }

  return res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorMiddleware;