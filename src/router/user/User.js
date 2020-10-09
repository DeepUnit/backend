import { UserModel } from '../../model';
import { generatePassword, generateRandom, signJwt } from '../../lib/Util';
import { ERROR_EXIST_EMAIL } from '../../lib/Constant';

export const getUser = async(ctx) => {
  ctx.body = 'GET_USERS';
  return;
};

export const addUser = async(ctx) => {
  const { email, password } = ctx.request.body;

  const isExistEmail = await UserModel.countDocuments({ email });

  if(isExistEmail) {
    return ctx.app.emit('error', ERROR_EXIST_EMAIL, ctx);
  }

  const refreshToken = generateRandom(32);
  const User = new UserModel({
    email,
    password: await generatePassword(password),
    registrationType: 'LO',
    oauthId: null,
    refreshToken,
    createdAt: Date.now()
  });

  await User.save();

  const tokenResponse = {
    accessToken: signJwt({ _id: User._id, email: User.email, createdAt: User.createdAt }),
    refreshToken,
  };

  ctx.status = 200;
  ctx.body = tokenResponse;
};
