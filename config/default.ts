export default {
  system: {
    port: 0,
  },
  mongo_db: {
    uri: '',
  },
  jwt: {
    secret: 'superultramegasecretpleaseonlyusefordevelopment',
    issuer: 'bank-account.razielini.test',
    algorithm: 'HS256',
    expiresIn: 300000,
  },
};
