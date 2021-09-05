import { default as user } from './models/user';
import connection from './connection';

export default {
  connection,
  models: {
    user,
  },
};
