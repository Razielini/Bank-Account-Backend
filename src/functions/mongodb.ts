export const fetchDocument = ({ store, filter }: any) => store.findOne(filter);
export const createDocument = ({ store, data, options = null }: any) =>
  new store(data).save({ ...options });
