"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const chalk_1 = __importDefault(require("chalk"));
const object_1 = require("../utils/object");
const consoleFormat = winston_1.default.format.printf(({ level, message, timestamp }) => {
    var levelLower = level.toLocaleLowerCase();
    message = (0, object_1.isObject)(message) ? JSON.stringify(message) : message;
    const formatter = {
        info: (message) => chalk_1.default.green(message),
        warn: (message) => chalk_1.default.yellow(message),
        error: (message) => chalk_1.default.red(message),
        debug: (message) => chalk_1.default.cyan(message),
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
const logger = winston_1.default.createLogger({
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.splat(), winston_1.default.format.json(), consoleFormat),
    transports: [],
});
logger.add(new winston_1.default.transports.Console({}));
exports.default = logger;
//# sourceMappingURL=logger.js.map