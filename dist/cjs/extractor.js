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
const validation_1 = require("./utils/validation");
const promise_1 = require("./utils/promise");
const fs_1 = require("fs");
const exit_status_1 = require("./utils/exit-status");
const logger_1 = __importDefault(require("./services/logger"));
const localise_api_1 = __importDefault(require("./localise-api"));
const localiseApi = (0, localise_api_1.default)({ logger: logger_1.default });
const file_1 = require("./utils/file");
function Extractor({ ignoreExisting = true, async = false, locale = 'en', key = process.env.LOCALISE_KEY, file = '', tagNew = null, ext = '', exitStatus = false, } = {}) {
    var _a;
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
        if (!ext)
            ext = file.split('.').pop();
        const path = (0, file_1.filePath)(file);
        const data = yield fs_1.promises.readFile(path, 'utf8');
        const result = yield localiseApi.push(ext, {
            'ignore-existing': ignoreExisting,
            'tag-new': tagNew,
            async,
            locale,
            key,
        }, data);
        if (result.status === 200) {
            logger_1.default.info(`completed`);
            const msg = result.data;
            logger_1.default.info(JSON.stringify({
                status: msg.status,
                message: msg.message,
                code: (_a = msg === null || msg === void 0 ? void 0 : msg.locales) === null || _a === void 0 ? void 0 : _a.code,
                assets: msg.assets,
            }, null, 2));
        }
        else if (result.status === 201) {
            let completed = false;
            const location = result.headers.location;
            while (!completed) {
                try {
                    const progressRes = yield localiseApi.progress(location, { key });
                    logger_1.default.info(`importation progress... ${progressRes.data.progress}/100`);
                    if (progressRes.data.progress == 100) {
                        logger_1.default.info(`completed`);
                        console.log(progressRes.data);
                        completed = true;
                    }
                    else {
                        yield (0, promise_1.sleep)(1000);
                    }
                }
                catch (error) {
                    logger_1.default.error(error);
                    completed = true;
                }
            }
        }
        if (exitStatus)
            (0, exit_status_1.exitSuccess)();
        else
            return true;
    });
}
exports.default = Extractor;
//# sourceMappingURL=extractor.js.map