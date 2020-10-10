import Router from 'koa-router';
import { jwtAuthentication } from '../../lib/Middleware';
import { facebookConnect, instagramTags, getPlaystoreList } from './Provider';

const router = new Router();

router.post('/facebook', jwtAuthentication, facebookConnect);
router.get('/instagram', jwtAuthentication, instagramTags);
router.get('/playstore', jwtAuthentication, getPlaystoreList);

export default router;
