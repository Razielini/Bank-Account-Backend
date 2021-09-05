import functions from '../functions';

const userController = (storeInjection: any) => {
  let store = storeInjection;

  const register = async ({ filter, update }: any) => {
    const user = await functions.mongodb.fetchDocument({ store, filter });
    if (!user) return functions.mongodb.createDocument({ store, data: update });
  };

  return {
    register,
  };
};

export default userController;
