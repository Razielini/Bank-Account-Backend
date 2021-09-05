export const fetchDocument = ({ store, filter }: any) => store.findOne(filter);
export const createDocument = ({ store, data }: any) => new store(data).save();
