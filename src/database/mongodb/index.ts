import { default as user } from './models/user';
import { default as person } from './models/person';
import connection from './connection';

export default {
  connection,
  models: {
    user,
    person,
  },
};
