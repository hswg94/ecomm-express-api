const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Separate CSRF error handler
const csrfErrorHandler = (err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({
      message: 'Invalid CSRF token',
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
  }
  next(err);
};

const errorHandler = (err, req, res, next) => {
  console.log(err.stack);
  let statusCode = err.statusCode || 500;
  if (err.name === "CastError") {
    statusCode = 400;
  }

  if (process.env.NODE_ENV == "production") {
    res.status(statusCode).json({
      message: err.message,
      stack: null,
    });
  } else {
    res.status(statusCode).json({
      message: err.message,
      stack: err.stack,
    });
  }
};

export { notFound, csrfErrorHandler, errorHandler };
