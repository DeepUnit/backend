import dotenv from 'dotenv';

dotenv.config();

export const {
  HTTP_PORT,
  HTTP_HOST,
  MONGO_URI,
  MONGO_MAX_POOLSIZE,
  JWT_SECRET,
  FACEBOOK_TOKEN,
} = process.env;

export const ERROR_EXIST_EMAIL = { status: 409, message: 'ERROR_EXIST_EMAIL' };
export const ERROR_TOKEN_NOT_FOUND = { status: 404, message: 'ERROR_TOKEN_NOT_FOUND' };
export const ERROR_TOKEN_VALIDATION = { status: 401, message: 'ERROR_TOKEN_VALIDATION' };
export const ERROR_USER_NOT_FOUND = { status: 404, message: 'ERROR_USER_NOT_FOUND' };
export const ERROR_HTTP_REQUEST = { status: 500, message: 'ERROR_HTTP_REQUEST' };
export const ERROR_BODY_PARAMETER = { stauts: 400, message: 'ERROR_BODY_PARAMETER' };
