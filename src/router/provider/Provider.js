import { requestClient } from '../../lib/Util';
import { FACEBOOK_TOKEN, ERROR_HTTP_REQUEST, ERROR_BODY_PARAMETER } from '../../lib/Constant';

const facebookEndpoint = 'https://graph.facebook.com/v8.0';
const yyyymmddRegex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;

export const facebookConnect = async(ctx) => {
  const { start, end, fbAdId } = ctx.request.body;

  if(!yyyymmddRegex.test(start) || !yyyymmddRegex.test(end)) {
    return ctx.app.emit('error', ERROR_BODY_PARAMETER, ctx);
  }

  const getReport = await requestClient({
    method: 'GET',
    url: `${facebookEndpoint}/${fbAdId}/insights?fields=impressions,cpm,date_start,date_stop&breakdowns=age,gender&time_range={"since": "${start}", "until": "${end}"}&time_increment=1`,
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
