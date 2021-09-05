import responses from '../utils/responses';
import AppError from '../utils/AppError';
import catchAsync from '../utils/catchAsync';
import { default as controllers } from '../controllers';

const authService = ({ store: { user } }: any) => {
  const userController = controllers.user(user);

  const register = catchAsync(async (req: any, res: any, next: any) => {
    const { body: data } = req;

    if (data.password !== data.confirmPassword)
      return next(new AppError({ message: 'Passwords do not match', status: 400 }));

    const user = await userController.upsert({
      filter: { email: data.email },
      update: { ...data },
    });

    if (!user) return next(new AppError({ message: 'Error: No user created', status: 400 }));

    responses.success({
      res,
      message: { user },
    });
  });

  return {
    register,
  };
};

export default authService;
