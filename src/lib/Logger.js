import winston from 'winston';
import winstonRotate from 'winston-daily-rotate-file';

const customFormant = winston.format.printf(({
  level, message, label, timestamp,
}) => `${timestamp} [${label}] ${level}: ${typeof message === 'object' ? JSON.stringify(message) : message}`);

export default class Logger {
  static createLogger(label) {
    return winston.createLogger({
      format: winston.format.combine(
        winston.format.label({ label }),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        customFormant,
      ),
      transports: [
        new (winston.transports.Console)({ level: 'debug' }),
        new winstonRotate({
          level: 'info',
          datePattern: 'YYYY-MM-DD',
          filename: './logs/%DATE%.log',
          json: true,
          maxFiles: 3,
          colorize: false,
          handleExceptions: true,
        }),
        new winstonRotate({
          level: 'error',
          datePattern: 'YYYY-MM-DD',
          filename: './logs/%DATE%.error.log',
          json: true,
          maxFiles: 3,
          colorize: false,
          handleExceptions: true,
        }),
      ],
    });
  }
}
