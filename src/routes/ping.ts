import { IRoute } from '../interfaces/router';
import ping from '../services/ping';

const pingRoutes = ({ app, router }: IRoute) => {
  app.use('/ping', router);
  router.get('/', ping);
};

export default pingRoutes;
