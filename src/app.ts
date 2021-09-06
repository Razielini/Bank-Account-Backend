import express, { Application, Router } from 'express';
import cors from 'cors';
import { default as Routes } from './routes';
import { mongodb } from './database';

const init = async ({ logger, config }: any) => {
  process.on('uncaughtException', (err) => {
    logger.error(err.name, err.message);
    logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');

    process.exit(1);
  });

  const app: Application = express();

  const port = config.get('system.port') || 3000;

  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  mongodb.connection({
    db: config.get('mongo_db.uri'),
    logger: logger.child({ module: 'database' }),
  });

  Object.values(Routes).forEach((route: any) => {
    route({
      app,
      router: express.Router(),
      store: mongodb.models,
    });
  });

  app.all('*', (req, res, next) => {
    res.status(404).json({
      status: 'fail',
      message: `Can't find ${req.originalUrl} on this server!`,
    });
  });

  try {
    app.listen(port, (): void => {
      logger.info(`Server started on port ${port}`);
    });
  } catch (error: any) {
    logger.error(`Error occured ${error.message}`);
  }

  process.on('unhandledRejection', (err: any) => {
    logger.error(err.name, err.message);
    logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
    process.exit(1);
  });
};

export default init;
