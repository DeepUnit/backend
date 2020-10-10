import { UserModel } from '../../model';
import { generateRandom, signJwt } from '../../lib/Util';
import { ERROR_USER_NOT_FOUND } from '../../lib/Constant';

const userTokenCreator = (User, refreshToken) => {
  const tokenResponse = {
    accessToken: '',
    refreshToken: ''
  };

  tokenResponse.accessToken = signJwt({ _id: User._id, email: User.email, createdAt: User.createdAt });
  tokenResponse.refreshToken = refreshToken || generateRandom(32);
  
  return tokenResponse;
};

export const getUser = async(ctx) => {
  const { _id } = ctx.jwt;

  const result = await UserModel.findOne({ _id });
  
  if(!result) {
    return ctx.app.emit('error', ERROR_USER_NOT_FOUND, ctx);
  }

  ctx.status = 200;
  ctx.body = result;
};

export const oauthRegisterOrLogin = async(ctx) => {
  const { email, registrationType, ad_id } = ctx.request.body;

  let refreshToken;
  let User = await UserModel.findOne({ email });

  if(!User) {
    refreshToken = generateRandom(32);
    User = new UserModel({
      email,
      registrationType,
      refreshToken,
      ad_id,
      createdAt: Date.now()
    });
  
    await User.save();
  } else {
    refreshToken = User.refreshToken;
  }

  ctx.status = 200;
  ctx.body = userTokenCreator(User, refreshToken);
};
