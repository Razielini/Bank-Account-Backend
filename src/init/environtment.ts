import * as dotenv from 'dotenv';

const environment = (env: string = 'dev') => {
  process.env.NODE_ENV = env;
  dotenv.config({ path: `${process.cwd()}/config/.env.${env}` });
};

export default environment;
