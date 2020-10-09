import Router from 'koa-router';
import { getUser, addUser } from './User';

const router = new Router();

router.get('/', getUser);
router.post('/', addUser);

export default router;
