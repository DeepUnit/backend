import Router from 'koa-router';
import { jwtAuthentication } from '../../lib/Middleware';
import { facebookConnect } from './Provider';

const router = new Router();

router.post('/facebook', jwtAuthentication, facebookConnect);

export default router;
