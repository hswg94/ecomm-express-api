const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  // Log the requester's IP address
  console.log(`Not Found: ${req.originalUrl} | IP: ${req.ip}`);
  res.status(404);
  next(error); //this looks for a function with the err parameter
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

export { notFound, errorHandler };
