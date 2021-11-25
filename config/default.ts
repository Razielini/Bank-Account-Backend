export default {
  system: {
    port: 3100,
  },
  mongo_db: {
    uri: 'mongodb+srv://db_user_chat_node_server:lMV2zReaxaL03UjI@cluster0.oyyxw.mongodb.net/bank-account?retryWrites=true&w=majority',
  },
  jwt: {
    secret: 'superultramegasecretpleaseonlyusefordevelopment',
    issuer: 'bank-account.razielini.test',
    algorithm: 'HS256',
    expiresIn: 300000,
  },
  interfaces: {
    typeProducts: {
      CHEQUERA: 'CHEQUERA',
      CREDITO: 'CREDITO',
      DEBITO: 'DEBITO',
    },
    typeTransfer: {
      CARGO: 'CARGO',
      ABONO: 'ABONO',
    },
    typeOperation: {
      SPEI: 'SPEI',
      INTERBANCARIO: 'INTERBANCARIO',
      TRANSFERENCIA: 'TRANSFERENCIA',
      OTHER: 'OTHER',
    },
    typeStatus: {
      PENDIENTE: 'PENDIENTE',
      APROBADO: 'APROBADO',
      ERROR: 'ERROR',
    },
    defaultTypeStatus: 'PENDIENTE',
  },
  mongoDb: {
    find: {
      limit: 10,
    },
  },
};
