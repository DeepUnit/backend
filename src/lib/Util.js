import Bcrypt from 'bcrypt';
import Randomstring from 'randomstring';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './Constant';

export const generatePassword = (password) => {
  return Bcrypt.hash(password, 12);
};

export const validatePassword = (storedPassword, inputPassword) => {
  return Bcrypt.compare(storedPassword, inputPassword);
};

export const generateRandom = (len) => {
  return Randomstring.generate({
    length: len,
    charset: 'alphabetic'
  });
};

export const signJwt = (data) => {
  return jwt.sign(JSON.parse(JSON.stringify(data)), JWT_SECRET, { algorithm: "HS512", expiresIn: "1 years" });
};

export const validateJwt = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
