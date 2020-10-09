import { validateJwt } from './Util';
import { ERROR_TOKEN_NOT_FOUND, ERROR_TOKEN_VALIDATION } from './Constant';

export const jwtAuthentication = async(ctx, next) => {
  const accessToken = ctx.headers.authorization;
  let decode;

  if(!accessToken) {
    return ctx.app.emit('error', ERROR_TOKEN_NOT_FOUND, ctx);
  }

  try {
    decode = validateJwt(accessToken);
  } catch(err) {
    return ctx.app.emit('error', ERROR_TOKEN_VALIDATION, ctx);
  }

  ctx.jwt = decode;
  await next();
};
