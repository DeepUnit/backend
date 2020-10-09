import { UserModel } from '../../model';
import { generateRandom, signJwt } from '../../lib/Util';
import { ERROR_EXIST_EMAIL } from '../../lib/Constant';

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
  ctx.body = 'GET_USERS';
  return;
};

export const oauthRegisterOrLogin = async(ctx) => {
  const { email, oauthId, registrationType } = ctx.request.body;

  let refreshToken;
  let User = await UserModel.findOne({ email });

  if(!User) {
    refreshToken = generateRandom(32);
    User = new UserModel({
      email,
      registrationType,
      oauthId,
      refreshToken,
      createdAt: Date.now()
    });
  
    await User.save();
  } else {
    refreshToken = User.refreshToken;
  }

  ctx.status = 200;
  ctx.body = userTokenCreator(User, refreshToken);
};
