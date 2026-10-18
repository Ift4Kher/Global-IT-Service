// Not Found Middleware for API routes
function notFoundHandler(req, res, next) {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.method} ${req.originalUrl} not found`
  });
}

// Global Centralized Error Handling Middleware
function errorHandler(err, req, res, next) {
  const isDev = process.env.NODE_ENV === 'development';
  const statusCode = err.statusCode || (res.statusCode >= 400 ? res.statusCode : 500);

  console.error(`[Server Error] [${req.method} ${req.originalUrl}]:`, err.message);
  if (isDev && err.stack) {
    console.error(err.stack);
  }

  // Never leak internal DB credentials, SQL syntax errors, or stack traces in production
  let publicMessage = err.message || 'An unexpected internal server error occurred.';
  if (!isDev && statusCode === 500) {
    publicMessage = 'An internal server error occurred. Please try again later.';
  }

  res.status(statusCode).json({
    success: false,
    message: publicMessage,
    ...(isDev && { stack: err.stack })
  });
}

module.exports = {
  notFoundHandler,
  errorHandler
};
