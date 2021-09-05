import AppError from './AppError';
import catchAsync from '../utils/catchAsync';
import config from 'config';
import functions from '../functions';

const verifyToken = catchAsync(async (req: any, res: any, next: any) => {
  const token = req.headers['authorization'].split('JWT ')[1];

  if (!token) next(new AppError({ message: 'Unauthorizer.', status: 401 }));
  const decoded: any = await functions.jwt.verifyToken({
    token,
    secret: config.get('jwt.secret'),
  });

  if (!decoded) next(new AppError({ message: 'Unauthorizer.', status: 401 }));
  req.body.userId = decoded.id;
  next();
});

export default verifyToken;
