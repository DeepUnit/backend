import dotenv from 'dotenv';

dotenv.config();

export const {
  HTTP_PORT,
  HTTP_HOST,
  MONGO_URI,
  MONGO_MAX_POOLSIZE,
  JWT_SECRET
} = process.env;

export const ERROR_EXIST_EMAIL = { status: 409, message: 'ERROR_EXIST_EMAIL' };
