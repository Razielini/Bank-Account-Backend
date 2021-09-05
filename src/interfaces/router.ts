import { Application, Router } from 'express';

export interface IRoute {
  app: Application;
  router: Router;
}
