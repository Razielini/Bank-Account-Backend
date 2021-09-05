import functions from '../functions';

const userController = (storeInjection: any) => {
  let store = storeInjection;

  const register = async ({ filter, update }: any) => {
    const user = await functions.mongodb.fetchDocument({ store, filter });
    if (!user) return functions.mongodb.createDocument({ store, data: update });
  };

  const findOne = async ({ filter }: any) =>
    functions.mongodb.fetchDocument({ store, filter }) || false;

  const comparePasswords = async ({ password, hashedPassword }: any) => {
    return functions.bcrypt.comparePasswords({
      password,
      hashedPassword,
    });
  };

  return {
    register,
    findOne,
    comparePasswords,
  };
};

export default userController;
