import { Application, Router } from 'express';
import { Model } from 'mongoose';

export interface IRoute {
  app: Application;
  router: Router;
  store: { [key: string]: Model<any> };
}
