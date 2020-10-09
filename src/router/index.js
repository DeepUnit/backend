import Router from 'koa-router';
import UserRouter from './user';
import ProviderRouter from './provider';

const router = new Router();

router.use('/user', UserRouter.routes());
router.use('/provider', ProviderRouter.routes());

export default router;
