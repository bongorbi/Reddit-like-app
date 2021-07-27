import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import router from './routes';
import json from 'koa-json';
import logger from 'koa-logger';
import cors from '@koa/cors';

const port = 3002;
const app = new Koa();

export function startServer(serverPort) {
  app.use(logger());
  app.use(bodyParser());
  app.use(json());
  app.use(cors());
  app.use(router.routes()).use(router.allowedMethods());
  return app.listen(serverPort || port);
}

startServer();
