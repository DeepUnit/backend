import Mongoose from 'mongoose';
import Logger from './Logger';
import { MONGO_URI } from './Constant';

const logger = Logger.createLogger('MONGO');

export default class MongoDBManager {
  constructor() {
    this.connection = null;
  }

  async init() {
    this.connection = await Mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    logger.info(`'${MONGO_URI.split('/')[3]}' Mongo Connection Successfully`);
  }
}
