import { requestClient } from '../../lib/Util';
import { FACEBOOK_TOKEN, RAKUTEN_API_KEY, ERROR_HTTP_REQUEST, ERROR_BODY_PARAMETER } from '../../lib/Constant';

const facebookEndpoint = 'https://graph.facebook.com/v8.0';
const instagramEndpoint = 'https://hashtagy-generate-hashtags.p.rapidapi.com/v1';
const playstoreEndpoint = 'https://gplaystore.p.rapidapi.com';
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
  
  const impressions = { percent: 0, value: 0, list: [
    { date: '2020-10-04', total: 20 },
    { date: '2020-10-05', total: 40 },
    { date: '2020-10-06', total: 70 },
    { date: '2020-10-07', total: 34 },
    { date: '2020-10-08', total: 14 },
  ] };
  const cpm = { percent: 0, value: 0, list: [
    { date: '2020-10-04', total: 28000 },
    { date: '2020-10-05', total: 60000 },
    { date: '2020-10-06', total: 167979 },
    { date: '2020-10-07', total: 180000 },
    { date: '2020-10-08', total: 190222 },
  ] };
  const gender = { percent: 0, value: 0, list: []};
  const date = { today: '2020-10-10', yesterday: '2020-10-09', cpm: 0, impressions: 0 };
  for(let item of getReport.data.data) {
    const impressionsNum = parseInt(item.impressions);
    const cpmNum = parseInt(item.cpm);

    const isExist = impressions.list.findIndex((elem) => elem.date === item.date_stop);

    if(isExist < 0) {
      impressions.list.push({
        date: item.date_stop,
        total: impressionsNum,
      });
      cpm.list.push({
        date: item.date_stop,
        total: cpmNum,
      });
    } else {
      impressions.list[isExist].total += impressionsNum;
      cpm.list[isExist].total += cpmNum;
    }

    const isAgeExist = gender.list.findIndex((elem) => elem.age === item.age);

    if(isAgeExist < 0) {
      gender.list.push({
        age: item.age,
        maleValue: item.gender === 'male' ? impressionsNum : 0,
        femaleValue: item.gender === 'female' ? impressionsNum : 0, 
      });
    } else {
      if(item.gender === 'male') {
        gender.list[isAgeExist].maleValue += impressionsNum;
      } else if(item.gender === 'female') {
        gender.list[isAgeExist].femaleValue += impressionsNum;
      }
    }

    if(date.today === item.date_stop) {
      cpm.value += cpmNum;
      impressions.value += impressionsNum;
    } else if (date.yesterday === item.date_stop) {
      date.cpm += cpmNum;
      date.impressions += impressionsNum;
    }
  }

  impressions.percent = Math.floor((impressions.value / date.impressions) * 100);
  cpm.percent = Math.floor((cpm.value / date.cpm) * 100);

  ctx.status = 200;
  ctx.body = {
    impressions,
    cpm,
    gender,
  };
};

export const instagramTags = async(ctx) => {
  const { keyword } = ctx.query;

  if(!keyword || !keyword.length) {
    return ctx.app.emit('error', ERROR_BODY_PARAMETER, ctx);
  }

  const getTags = await requestClient({
    method: 'GET',
    url: `${instagramEndpoint}/insta/tags?keyword=${keyword}`,
    headers: {
      'X-RapidAPI-Host': 'hashtagy-generate-hashtags.p.rapidapi.com',
      'X-RapidAPI-Key': RAKUTEN_API_KEY,
      'useQueryString': true
    }
  });

  ctx.status = 200;
  ctx.body = { hashtag: getTags.data.data.hashtags };
};

export const getPlaystoreList = async(ctx) => {
  const getList = await requestClient({
    method: 'GET',
    url: `${playstoreEndpoint}/topGames/GAME_ACTION`,
    headers: {
      'X-RapidAPI-Host': 'gplaystore.p.rapidapi.com',
      'X-RapidAPI-Key': RAKUTEN_API_KEY,
      'useQueryString': true
    }
  });

  for(let item of getList.data) {
    item.rating = item.rating.toString();
  }

  ctx.status = 200;
  ctx.body = { playstore: getList.data };
};
