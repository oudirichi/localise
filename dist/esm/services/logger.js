import winston from "winston";
import chalk from "chalk";
import { isObject } from '../utils/object';
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
    if (process.env.NODE_ENV === 'development') {
        return `[${timestamp}] [${level}]: ${message}`;
    }
    else {
        return `[${timestamp}] ${message}`;
    }
});
const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
    format: winston.format.combine(winston.format.timestamp(), winston.format.splat(), winston.format.json(), consoleFormat),
    transports: [],
});
logger.add(new winston.transports.Console({}));
export default logger;
//# sourceMappingURL=logger.js.map