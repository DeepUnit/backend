import Koa from 'koa';
import KoaBody from 'koa-body';
import Cors from '@koa/cors';
import Database from './lib/Database';
import Logger from './lib/Logger';
import LoadRouter from './router';
import { HTTP_HOST, HTTP_PORT } from './lib/Constant';

const logger = Logger.createLogger('HTTP-BIND');

const app = new Koa();
const db = new Database();
db.init();

app.use(KoaBody());
app.use(Cors());
app.use(async(ctx, next) => {  
  await next();
  const responseTime = ctx.response.get('X-Response-Time');
  logger.info(`[${ctx.method}] ${ctx.url} - ${responseTime}`);
});

app.use(async(ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(LoadRouter.routes());

app.listen(HTTP_PORT, HTTP_HOST, () => {
  logger.info(`${HTTP_HOST}:${HTTP_PORT} Bind Successfully`);
});
