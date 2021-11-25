import AppError from '../utils/AppError';
import Logger from 'pino';

const logger = Logger().child({ module: 'errorHandler' });

const sendErrorDev = (err: any, res: any) => {
  res.status(err.status).send({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err: any, res: any) => {
  if (err.isOperational) {
    res.status(err.status).json({
      status: err.status,
      message: err.message,
    });
  } else {
    logger.error('ERROR 💥: ', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

const handleCastErrorDB = (err: any) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError({ message, status: 409 });
};

const handleValidationErrorDB = (err: any) => {
  const errors = Object.values(err.errors).map((el: any) => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError({ message, status: 409 });
};

const handleDuplicateFieldsDB = (err: any) => {
  const field = Object.keys(err.keyValue);
  const message = `An account with that ${field} already exists.`;
  return new AppError({ message, status: 409 });
};

const errorHandler = (err: any, req: any, res: any, next: any) => {
  logger.info(err.message);
  let error = { ...err, message: err.message };
  if (error.name === 'CastError') error = handleCastErrorDB(error);
  if (error.code === 11000) error = handleDuplicateFieldsDB(error);
  if (error.kind === 'enum') error = handleDuplicateFieldsDB(error);
  if (error.name === 'ValidationError' || err.errors) error = handleValidationErrorDB(error);

  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'dev') {
    sendErrorDev(error, res);
  } else {
    sendErrorProd(error, res);
  }
};

export default errorHandler;
