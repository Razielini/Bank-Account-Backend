import responses from '../utils/responses';
import AppError from '../utils/AppError';
import catchAsync from '../utils/catchAsync';
import config from 'config';
import { default as controllers } from '../controllers';

const authService = ({ store: { user } }: any) => {
  const userController = controllers.user(user);
  const authController = controllers.auth();

  const register = catchAsync(async (req: any, res: any, next: any) => {
    const { body: data } = req;

    if (!authController.compareRawPassword(data))
      return next(new AppError({ message: 'Passwords do not match', status: 400 }));

    const user = await userController.register({
      filter: { email: data.email },
      update: { ...data },
    });

    if (!user) return next(new AppError({ message: 'Error: No user created', status: 400 }));

    responses.success({
      res,
      message: { ...user.toJSON() },
    });
  });

  const login = catchAsync(async (req: any, res: any, next: any) => {
    const { body: data } = req;

    const user = await userController.findOne({ filter: { email: data.email } });
    if (!user) return next(new AppError({ message: 'Unauthorizer', status: 403 }));

    const match = await userController.comparePasswords({
      password: data.password,
      hashedPassword: user.password,
    });

    if (!match) next(new AppError({ message: 'Wrong password or email. Try again.', status: 401 }));

    const token = await authController.createSignToken({ user, jwt: config.get('jwt') });

    if (!token)
      next(new AppError({ message: 'Error the password cannot be generated.', status: 500 }));

    responses.success({
      res,
      message: { auth: true, token },
    });
  });

  const me = catchAsync(async (req: any, res: any, next: any) => {
    const {
      body: { userId },
    } = req;
    const user = await userController.findOne({ filter: { _id: userId } });

    if (!user) next(new AppError({ message: 'Unauthorizer.', status: 401 }));

    responses.success({
      res,
      message: { ...user.toJSON() },
    });
  });

  return {
    register,
    login,
    me,
  };
};

export default authService;
