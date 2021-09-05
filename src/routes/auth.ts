import { IRoute } from '../interfaces/router';
import validate from '../utils/validateEntryData';
import services from '../services';

const authRoutes = ({ app, router, store }: IRoute) => {
  const authService = services.auth({ store });
  app.use('/auth', router);
  router.post('/register', validate.auth.register, authService.register);
};

export default authRoutes;
