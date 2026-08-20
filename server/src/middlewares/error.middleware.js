const errorMiddleware = (error, req, res, next) => {
  console.error("ERROR:", error);

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};

export default errorMiddleware;