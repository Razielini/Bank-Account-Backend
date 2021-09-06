import { IRoute } from '../interfaces/router';
import validate from '../utils/validateEntryData';
import services from '../services';
import verifyToken from '../utils/verifyToken';

const transferRoutes = ({ app, router, store }: IRoute) => {
  const transferService = services.transfer({ store });
  app.use('/transfer', router);
  router.get('/', verifyToken, transferService.getAll);
  router.post('/register', validate.transfer.register, verifyToken, transferService.register);
};

export default transferRoutes;
