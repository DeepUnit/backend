import { requestClient, sleep } from '../../lib/Util';
import { FACEBOOK_TOKEN, FACEBOOK_AD_ID, ERROR_HTTP_REQUEST } from '../../lib/Constant';

const facebookEndpoint = 'https://graph.facebook.com/v8.0';

export const facebookConnect = async(ctx) => {
  const getReport = await requestClient({
    method: 'GET',
    url: `${facebookEndpoint}/${FACEBOOK_AD_ID}/insights?fields=impressions,adset_id,quality_ranking,frequency&breakdowns=age,gender`,
    headers: {
      Authorization: `Bearer ${FACEBOOK_TOKEN}`,
    }
  });

  if(!getReport.data) {
    return ctx.app.emit('error', ERROR_HTTP_REQUEST, ctx);
  }
  
  ctx.status = 200;
  ctx.body = getReport.data;
};
