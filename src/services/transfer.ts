import responses from '../utils/responses';
import AppError from '../utils/AppError';
import catchAsync from '../utils/catchAsync';
import config from 'config';
import { default as controllers } from '../controllers';
import mongoose from 'mongoose';

const transferService = ({ store: { transfer, account } }: any) => {
  const accountController = controllers.account(account);
  const transferController = controllers.transfer(transfer);

  const register = catchAsync(async (req: any, res: any, next: any) => {
    const { body: data } = req;

    const originAccount = await accountController.findOne({
      filter: {
        numberAccount: data.originAccount,
      },
    });
    if (!originAccount)
      return next(
        new AppError({
          message: 'The request account dosnt exist.',
          status: 400,
        })
      );

    if (originAccount.person.toString() !== data.userId)
      return next(
        new AppError({
          message: 'The user requesting the transfer not match with the owner of the account',
          status: 400,
        })
      );

    const destinationAccount = await accountController.findOne({
      filter: {
        numberAccount: data.destinationAccount,
      },
    });

    if (!destinationAccount)
      return next(
        new AppError({
          message: 'The destination account dosnt exist.',
          status: 400,
        })
      );

    const transferAmounts = await transferController.calculateTransaction({
      originAccount,
      destinationAccount,
      data,
    });

    if (!transferAmounts)
      return next(
        new AppError({
          message: 'Error when calculate transfer.',
          status: 400,
        })
      );

    const session = await mongoose.startSession();
    session.startTransaction();
    const transfer = await transferController.register({
      data: {
        ...transferAmounts.transfer,
      },
      options: { session },
    });

    const newBalanceOriginalAccount = await accountController.update({
      account: {
        ...transferAmounts.originAccount,
      },
      options: { session, new: true },
    });

    const newBalanceDestinationAccount = await accountController.update({
      account: {
        ...transferAmounts.destinationAccount,
      },
      options: { session, new: true },
    });

    await session
      .commitTransaction()
      .catch(async (err: any) => {
        next(new AppError({ message: 'Error: Transfer.Register abortTransaction', status: 400 }));
        await session.abortTransaction();
      })
      .finally(() => {
        session.endSession();
      });

    responses.success({
      res,
      message: {
        transfer,
        originAccount: newBalanceOriginalAccount,
        destinationAccount: newBalanceDestinationAccount,
      },
      status: 201,
    });
  });

  const getAll = catchAsync(async (req: any, res: any, next: any) => {
    const {
      body: { userId },
    } = req;

    const transfers = await transferController.findAll({ filter: { user: userId } });

    responses.success({
      res,
      message: {
        transfers,
      },
    });
  });

  return {
    register,
    getAll,
  };
};

export default transferService;
