import functions from '../functions';

const accountController = (storeInjection: any) => {
  let store = storeInjection;

  const register = async ({ data, options }: any) => {
    const account = await create({
      account: data,
      options,
    });

    return account.toJSON();
  };

  const create = async ({ account, options }: any) =>
    functions.mongodb.createDocument({ store, data: account, options });

  const update = async ({ account, options }: any) =>
    functions.mongodb.updateDocument({ store, data: account, options });

  const findOne = async ({ filter }: any) =>
    functions.mongodb.fetchDocument({ store, filter }) || false;

  return {
    register,
    findOne,
    update,
  };
};

export default accountController;
