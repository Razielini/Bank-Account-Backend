import functions from '../functions';

const personController = (storeInjection: any) => {
  let store = storeInjection;

  const register = async ({ data, options }: any) => {
    const person = await create({
      person: data,
      options,
    });

    return person.toJSON();
  };

  const create = async ({ person, options }: any) =>
    functions.mongodb.createDocument({ store, data: person, options });

  const findOne = async ({ filter }: any) =>
    functions.mongodb.fetchDocument({ store, filter }) || false;

  const update = async ({ data, options }: any) =>
    functions.mongodb.updateDocument({ store, data, options });

  return {
    register,
    findOne,
    update,
  };
};

export default personController;
