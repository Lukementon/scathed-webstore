import { NextFunction, Request, Response } from 'express';
import ErrorResponse from '../utils/errorResponse';

const errorHandler = (
  err: ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err };
  error.message = err.message;
  if (process.env.NODE_ENV !== 'production') {
    console.log(err.stack);
  }

  if (err.name === 'CastError') {
    const message = `Resource not found with ID ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message });
};

export { errorHandler };
