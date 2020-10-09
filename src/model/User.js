import { Schema, model } from 'mongoose';
const { ObjectId } = Schema;

const User = new Schema({
  email: String,
  password: String,
  registrationType: String,
  oauthId: String,
  refreshToken: String,
  createdAt: Date
});

export default model('User', User);
