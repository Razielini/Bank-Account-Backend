import { IRoute } from '../interfaces/router';
import validate from '../utils/validateEntryData';
import services from '../services';
import verifyToken from '../utils/verifyToken';

const authRoutes = ({ app, router, store }: IRoute) => {
  const authService = services.auth({ store });
  app.use('/auth', router);
  router.post('/register', validate.auth.register, authService.register);
  router.post('/login', validate.auth.login, authService.login);
  router.get('/me', verifyToken, authService.me);
};

export default authRoutes;
