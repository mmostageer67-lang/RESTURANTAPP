const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
    });
  }
if (process.env.NODE_ENV === 'production') {
  if (!err.isOperational || err.statusCode === 500) {
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
}};

module.exports = errorHandler;
