import { default as user } from './models/user';
import { default as person } from './models/person';
import { default as account } from './models/account';
import { default as transfer } from './models/transfer';

import connection from './connection';

export default {
  connection,
  models: {
    user,
    person,
    account,
    transfer,
  },
};
