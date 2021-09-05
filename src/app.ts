import express, { Application, Router } from 'express';
import cors from 'cors';
import { default as Routes } from './routes';
import { IRoute } from './interfaces/router';

const init = async ({ logger, config }: any) => {
  const app: Application = express();
  const router: Router = express.Router();

  const port = config.get('system.port') || 3000;

  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  const appRouter: IRoute = {
    app,
    router,
  };

  Routes.ping(appRouter);

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
};

export default init;
