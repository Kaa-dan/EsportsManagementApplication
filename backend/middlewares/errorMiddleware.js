const notFound = (req, res, next) => {
  const error = new Error(`Not Found -${req.originalUrl}`); 
  res.status(404);
  next(error);
};

// Main Error Handling middleware
const errorHandler = (error, req, res, next) => {
  let statusCode = req.statusCode === 200 ? 500 : res.statusCode;
  let message = error.message;

  // Handling CastError in mongoose
  if (error.name === "CastErro" && error.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }

  res.status(statusCode).json({
    message,
    // For stack trace
    stack: process.env.NODE_ENV === "production" ? null : error.stack,
  });
};
export { notFound, errorHandler };
