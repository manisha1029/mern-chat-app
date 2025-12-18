export const notFound = (req, res, next) => {
    const error = new Error(`not found ${req.originalUrl}`);
    res.status(400)
    next(error)
}

export const errorHandler = (err, req, res, next) => {
    // If res already has a status code, use it; otherwise 500
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
  
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
  };

