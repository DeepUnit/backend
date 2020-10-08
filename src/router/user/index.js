import Router from 'koa-router';
import { getUser } from './User';

const router = new Router();

router.get('/', getUser);

export default router;
