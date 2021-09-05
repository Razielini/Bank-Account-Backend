import { Response } from 'express';
export interface responseProps {
  res: Response;
  message?: any;
  status?: number;
}

const success = ({ res, message, status }: responseProps): any => {
  let statusCode = status || 200;
  let statusMessage = message || '';
  res.status(statusCode).send({
    error: false,
    status: statusCode,
    data: statusMessage,
  });
};

export default {
  success,
};
