import { NextFunction, Request, Response } from "express";

const errorHandler = (
  err,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (response.headersSent) {
    return next(err);
  }
  const { message, statusCode, error } = err;

  const result = {
    error: error || "undefined",
    message: message || "error",
    status: statusCode || 500,
    timestamp: new Date(),
  };
  response.status(result.status).json(result);
};
export default errorHandler;
