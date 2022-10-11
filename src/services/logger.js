const winston = require('winston');
const chalk = require('chalk');
const { isObject } = require('../utils/object');

const consoleFormat = winston.format.printf(({ level, message, timestamp }) => {
  var levelLower = level.toLocaleLowerCase();
  message = isObject(message) ? JSON.stringify(message) : message;

  const formatter = {
    info: (message) => chalk.green(message),
    warn: (message) => chalk.yellow(message),
    error: (message) => chalk.red(message),
    debug: (message) => chalk.cyan(message),
  };

  if (levelLower in formatter) {
    message = formatter[levelLower](message);
  }

  if (process.env.NODE_ENV === 'production') {
    return `[${timestamp}] ${message}`;
  } else {
    return `[${timestamp}] [${level}]: ${message}`;
  }
});

const logger = winston.createLogger({
  // level: 'info',
  level: process.env.NODE_ENV === 'production' ? 'info': 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.splat(),
    winston.format.json(),
    consoleFormat
  ),
  // format: winston.format.json(),

  transports: [],
});


logger.add(new winston.transports.Console({
  // format: winston.format.simple(),
  // level: process.env.NODE_ENV === 'production' ? 'info': 'debug'
}));

// if (process.env.NODE_ENV !== 'production') {
//   logger.add(new winston.transports.Console({
//     level: 'debug'
//   }));
// }

module.exports = logger;
