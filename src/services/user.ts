import responses from '../utils/responses';
import catchAsync from '../utils/catchAsync';
import { default as controllers } from '../controllers';

const userService = ({ store: { user, person } }: any) => {
  const userController = controllers.user(user);
  const personController = controllers.person(person);

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

  const update = catchAsync(async (req: any, res: any, next: any) => {
    const { body: data } = req;

    const user = await personController.update({
      data: {
        _id: data.userId,
        ...data,
      },
    });

    responses.success({
      res,
      message: { user },
    });
  });

  return {
    logicalDelete,
    get,
    update,
  };
};

export default userService;
