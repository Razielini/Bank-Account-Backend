import config from 'config';

const findLimit = config.get('mongoDb.find.limit') || 10;

export const fetchDocument = ({ store, filter }: any) => store.findOne(filter);

export const fetchDocuments = ({ store, filter, limit = findLimit }: any) =>
  store.find(filter).limit(parseInt(limit));

export const createDocument = ({ store, data, options = null }: any) =>
  new store(data).save({ ...options });

export const updateDocument = ({ store, data, options = null }: any) =>
  store.findByIdAndUpdate(data._id, { ...data }, { ...options, new: true });

export const logicalDeleteDocument = ({ store, data, options = null }: any) =>
  store.findByIdAndUpdate(data._id, { status: false }, { ...options, new: true });
