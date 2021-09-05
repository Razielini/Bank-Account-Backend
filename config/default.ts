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
};
