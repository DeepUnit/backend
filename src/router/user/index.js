import Router from 'koa-router';
import { jwtAuthentication } from '../../lib/Middleware';
import { getUser, oauthRegisterOrLogin } from './User';

const router = new Router();

router.get('/', jwtAuthentication, getUser);
router.post('/', oauthRegisterOrLogin);

export default router;
