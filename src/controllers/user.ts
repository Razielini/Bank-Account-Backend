import functions from '../functions';

const userController = (storeInjection: any) => {
  let store = storeInjection;

  const register = async ({ data, options }: any) => {
    const user = await create({
      filter: { email: data.email },
      update: { ...data },
      options,
    });

    return user.toJSON();
  };

  const create = async ({ filter, update, options }: any) => {
    const user = await functions.mongodb.fetchDocument({ store, filter });
    if (!user) return functions.mongodb.createDocument({ store, data: update, options });
  };

  const findOne = async ({ filter }: any) =>
    functions.mongodb.fetchDocument({ store, filter }) || false;

  const comparePasswords = async ({ password, hashedPassword }: any) => {
    return functions.bcrypt.comparePasswords({
      password,
      hashedPassword,
    });
  };

  const logicalDelete = async ({ data }: any) =>
    functions.mongodb.logicalDelteDocument({ store, data }) || false;

  return {
    register,
    findOne,
    comparePasswords,
    logicalDelete,
  };
};

export default userController;
