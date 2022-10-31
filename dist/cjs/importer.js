"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const exit_status_1 = require("./utils/exit-status");
const validation_1 = require("./utils/validation");
const string_1 = require("./utils/string");
const file_1 = require("./utils/file");
const fs_1 = __importDefault(require("fs"));
const logger_1 = __importDefault(require("./services/logger"));
const unzip_1 = __importDefault(require("./services/unzip"));
const localise_api_1 = __importDefault(require("./localise-api"));
const unzip = (0, unzip_1.default)({ logger: logger_1.default });
const localiseApi = (0, localise_api_1.default)({ logger: logger_1.default });
const saveToFile = ({ clean, dest, locale, ext, parts, cleanDirFn, }) => {
    logger_1.default.debug(`dest: ${dest}`);
    logger_1.default.debug(`locale: ${locale}`);
    const destPath = (0, file_1.filePath)((0, string_1.stringTemplate)(dest, { ext, locale }));
    const destFolder = path_1.default.dirname(destPath);
    logger_1.default.debug(destPath);
    logger_1.default.debug(destFolder);
    if (!(0, file_1.existsSync)(destFolder)) {
        logger_1.default.debug(`folder does not exist... creating ${destFolder}...`);
        (0, file_1.createDir)(destFolder);
    }
    else if (clean) {
        cleanDirFn(destFolder, () => {
            logger_1.default.debug(`cleaning folder...`);
        });
    }
    const data = locale ? parts[locale] : parts;
    logger_1.default.info(`Saving: ${destPath}`);
    fs_1.default.writeFileSync(destPath, (typeof data === 'string') ? data : JSON.stringify(data));
    logger_1.default.info(' Done');
};
function Importer({ bundled = false, clean = false, dest = '', ext = 'json', filter = null, format = null, index = null, key = process.env.LOCALISE_KEY, order = null, status = null, exitStatus = false, } = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, validation_1.validateKey)(key)) {
            if (exitStatus) {
                logger_1.default.error('No API KEY provided. Please use -k <YOUR KEY> or by the a environment variable <LOCALISE_KEY>');
                (0, exit_status_1.exitFailure)();
            }
            else {
                return false;
            }
        }
        ;
        let parts;
        if (bundled) {
            parts = yield localiseApi.exportAll(ext, {
                'no-comments': true,
                ext,
                filter,
                format,
                index,
                key,
                order,
                status,
            });
        }
        else {
            const response = yield localiseApi.archive(ext, {
                'no-comments': true,
                ext,
                filter,
                format,
                index,
                key,
                order,
                status,
            });
            try {
                logger_1.default.debug('unziping...');
                parts = unzip(response);
                logger_1.default.debug(`unziping done...`);
            }
            catch (error) {
                logger_1.default.error(`COULD NOT PARSE RESPONSE TO ZIP. See the following error for report: ${JSON.stringify(error)}`);
                (0, exit_status_1.exitFailure)();
                return;
            }
        }
        logger_1.default.debug(parts);
        const cleanDirFn = (0, file_1.cleanDirOnce)();
        const saveOpts = {
            clean,
            dest,
            locale: '',
            ext,
            parts,
            cleanDirFn,
        };
        if (bundled) {
            saveToFile(saveOpts);
        }
        else {
            Object.keys(parts).forEach((partLocale) => saveToFile(Object.assign(Object.assign({}, saveOpts), { locale: partLocale })));
        }
        if (exitStatus)
            (0, exit_status_1.exitSuccess)();
        else
            return true;
    });
}
exports.default = Importer;
//# sourceMappingURL=importer.js.map