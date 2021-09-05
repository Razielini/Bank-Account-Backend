const userController = (storeInjection: any) => {
  let store = storeInjection;

  const upsert = async ({ filter, update }: any) => {
    const item = await store.findOneAndUpdate(filter, update, {
      upsert: true,
      new: true,
    });

    return item;
  };

  return {
    upsert,
  };
};

export default userController;
