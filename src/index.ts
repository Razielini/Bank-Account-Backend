import Logger from 'pino';
import init from './app';
import environment from './init/environtment';

const logger = Logger().child({ app: 'BankAccount' });
environment();

import config from 'config';

init({ logger, config });
