const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  const { message, statusCode, error } = err;
  // console.log("EErrrrrrrooooorrrrr\n", err);

  console.log({ message, statusCode, error });

  const result = {
    error: error || "undefined",
    message: message || "error",
    status: statusCode || 500,
    timestamp: new Date(),
  };
  res.status(result.status).json(result);
};
export default errorHandler;
