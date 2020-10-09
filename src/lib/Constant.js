import dotenv from 'dotenv';

dotenv.config();

export const {
  HTTP_PORT,
  HTTP_HOST,
  MONGO_URI
} = process.env;
