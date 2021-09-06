import { IRoute } from '../interfaces/router';
import services from '../services';
import verifyToken from '../utils/verifyToken';
import validate from '../utils/validateEntryData';

const userRoutes = ({ app, router, store }: IRoute) => {
  const userService = services.user({ store });
  app.use('/user', router);

  router.get('/', verifyToken, userService.get);
  router.patch('/', validate.user.update, verifyToken, userService.update);
  router.delete('/', verifyToken, userService.logicalDelete);
};

export default userRoutes;
