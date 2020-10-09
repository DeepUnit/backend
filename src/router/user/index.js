import Router from 'koa-router';
import { getUser, oauthRegisterOrLogin } from './User';

const router = new Router();

router.get('/', getUser);
router.post('/', oauthRegisterOrLogin);

export default router;
