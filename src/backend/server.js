import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import router from './routes';
import json from 'koa-json';
import logger from 'koa-logger';
import cors from '@koa/cors';

const port = 3001;
const app = new Koa();

app.use(logger());
app.use(json());
app.use(bodyParser());
app.use(cors());
app.use(router.routes()).use(router.allowedMethods());
app.listen(port);
console.log(`Application is running on port ${port}`);

