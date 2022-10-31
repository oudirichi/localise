var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { validateKey } from './utils/validation';
import { sleep } from './utils/promise';
import { promises as fs } from "fs";
import { exitFailure, exitSuccess } from './utils/exit-status';
import logger from './services/logger';
import LocaliseApi from './localise-api';
const localiseApi = LocaliseApi({ logger });
import { filePath, } from './utils/file';
export default function Extractor({ ignoreExisting = true, async = false, locale = 'en', key = process.env.LOCALISE_KEY, file = '', tagNew = null, ext = '', exitStatus = false, } = {}) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (!validateKey(key)) {
            if (exitStatus) {
                logger.error('No API KEY provided. Please use -k <YOUR KEY> or by the a environment variable <LOCALISE_KEY>');
                exitFailure();
            }
            else {
                return false;
            }
        }
        ;
        if (!ext)
            ext = file.split('.').pop();
        const path = filePath(file);
        const data = yield fs.readFile(path, 'utf8');
        const result = yield localiseApi.push(ext, {
            'ignore-existing': ignoreExisting,
            'tag-new': tagNew,
            async,
            locale,
            key,
        }, data);
        if (result.status === 200) {
            logger.info(`completed`);
            const msg = result.data;
            logger.info(JSON.stringify({
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
                    logger.info(`importation progress... ${progressRes.data.progress}/100`);
                    if (progressRes.data.progress == 100) {
                        logger.info(`completed`);
                        console.log(progressRes.data);
                        completed = true;
                    }
                    else {
                        yield sleep(1000);
                    }
                }
                catch (error) {
                    logger.error(error);
                    completed = true;
                }
            }
        }
        if (exitStatus)
            exitSuccess();
        else
            return true;
    });
}
//# sourceMappingURL=extractor.js.map