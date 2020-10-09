import { UserModel } from '../../model';

export const getUser = async(ctx) => {
  ctx.body = 'GET_USERS';
  return;
};

export const addUser = async(ctx) => {
  const { email, password, registrationType } = ctx.request.body;

  const User = new UserModel({
    email,
    password,
    registrationType,
    createdAt: Date.now()
  });

  await User.save();

  ctx.body = User;
  return;
};
