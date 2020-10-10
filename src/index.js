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
  try {
    await next();
  } catch(err) {
    logger.error(err.stack);
    ctx.status = 500;
    ctx.body = err.message;
  }
  const responseTime = ctx.response.get('X-Response-Time');
  logger.info(`[${ctx.method}] ${ctx.url} - ${ctx.status} - ${responseTime}`);
});

app.use(async(ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(LoadRouter.routes());

app.on('error', (err, ctx) => {
  ctx.status = err.status;
  ctx.body = err;
});

app.listen(HTTP_PORT, HTTP_HOST, () => {
  logger.info(`${HTTP_HOST}:${HTTP_PORT} Bind Successfully`);
});
