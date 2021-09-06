import functions from '../functions';
import config from 'config';

const transferController = (storeInjection: any) => {
  let store = storeInjection;

  const register = async ({ data, options }: any) => {
    const transfer = await create({
      transfer: data,
      options,
    });

    return transfer.toJSON();
  };

  const create = async ({ transfer, options }: any) =>
    functions.mongodb.createDocument({ store, data: transfer, options });

  const findOne = async ({ filter }: any) =>
    functions.mongodb.fetchDocument({ store, filter }) || false;

  const findAll = async ({ filter, limit }: any) =>
    functions.mongodb.fetchDocuments({ store, filter, limit }) || false;

  const calculateTransaction = async ({ originAccount, destinationAccount, data }: any) => {
    const { type, amount } = data;

    const numberAmount: number = parseInt(amount);
    const newBalances = functions.generic.calculateAmount({
      amount: numberAmount,
      origin: originAccount.balance,
      destination: destinationAccount.balance,
      type,
    });

    return {
      originAccount: {
        _id: originAccount._id,
        balance: newBalances.origin,
      },
      destinationAccount: {
        _id: destinationAccount._id,
        balance: newBalances.destination,
      },
      transfer: {
        originAccount: originAccount._id,
        destinationAccount: destinationAccount._id,
        concept: data.concept,
        amount: numberAmount,
        type,
        reference: data.reference,
        operation: data.operation,
        user: data.userId,
        status: config.get('interfaces.defaultTypeStatus'),
      },
    };
  };

  return {
    register,
    findOne,
    calculateTransaction,
    findAll,
  };
};

export default transferController;
