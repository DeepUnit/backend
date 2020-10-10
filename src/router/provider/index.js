import Router from 'koa-router';
import { jwtAuthentication } from '../../lib/Middleware';
import { facebookConnect, instagramTags } from './Provider';

const router = new Router();

router.post('/facebook', jwtAuthentication, facebookConnect);
router.get('/instagram', jwtAuthentication, instagramTags);

export default router;
