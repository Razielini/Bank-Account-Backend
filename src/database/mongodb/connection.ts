import mongoose from 'mongoose';

type dbStringConn = {
  db: string;
  logger: any;
};
export default ({ db, logger }: dbStringConn) => {
  const connect = () => {
    mongoose
      .connect(db)
      .then((conn) => {
        return logger.info(`Successfully connected ${db}`);
      })
      .catch((error: Error) => {
        logger.error('Error connecting to database: ', error);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on('disconnected', connect);
};
