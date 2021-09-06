import responses from '../utils/responses';
import AppError from '../utils/AppError';
import catchAsync from '../utils/catchAsync';
import config from 'config';
import { default as controllers } from '../controllers';
import mongoose from 'mongoose';

const userService = ({ store: { user } }: any) => {
  const userController = controllers.user(user);

  const logicalDelete = catchAsync(async (req: any, res: any, next: any) => {
    const {
      body: { userId },
    } = req;

    const deletedUser = await userController.logicalDelete({ data: { _id: userId } });

    responses.success({
      res,
      message: { user: deletedUser },
    });
  });

  const get = catchAsync(async (req: any, res: any, next: any) => {
    const {
      body: { userId },
    } = req;

    const user = await userController.findOne({ filter: { _id: userId } });

    responses.success({
      res,
      message: { user },
    });
  });

  return {
    logicalDelete,
    get,
  };
};

export default userService;
