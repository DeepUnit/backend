import Bcrypt from 'bcrypt';
import Randomstring from 'randomstring';
import Axios from 'axios';
import jwt from 'jsonwebtoken';
import Logger from './Logger';
import { JWT_SECRET } from './Constant';

const logger = Logger.createLogger('Util');

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

export const requestClient = async(request) => {
  let response = null;

  try {
    response = await Axios(request);
  } catch (err) {
    response = err.response;
    logger.info(`HttpRequest - ${JSON.stringify(err.response.data)}`);
    if(response) {
      response.data = null;
    }
  }

  return response;
};

export const sleep = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});
