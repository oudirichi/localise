var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
import * as objectUtils from './utils/object';
import { isAxiosError } from './utils/axios';
const baseLocaliseUrl = 'https://localise.biz:443/api';
function LocaliseApi({ logger }) {
    return {
        archive,
        assets,
        push,
        exportAll,
        progress,
    };
    ////////////////
    function apiError(error) {
        var _a, _b;
        logger.debug(error);
        if (((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.status) === 401) {
            logger.error('The key you provide is unauthorized, please provide another key');
        }
        else {
            logger.error(`Something whent wrong. Status code: ${(_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.status}`);
        }
    }
    function archive(ext, options) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.info('Fetching archive...');
            const cleanOptions = objectUtils.clean(options);
            logger.debug(cleanOptions);
            try {
                const resp = yield axios.get(`${baseLocaliseUrl}/export/archive/${ext}.zip`, {
                    responseType: 'arraybuffer',
                    params: cleanOptions,
                });
                return resp.data;
            }
            catch (error) {
                if (isAxiosError(error)) {
                    apiError(error);
                }
                throw error;
            }
        });
    }
    function exportAll(ext, options) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.info('Fetching assets...');
            const url = `${baseLocaliseUrl}/export/all.${ext}`;
            const cleanOptions = objectUtils.clean(options);
            logger.debug(url);
            logger.debug(cleanOptions);
            try {
                const resp = yield axios.get(url, {
                    params: cleanOptions
                });
                return resp.data;
            }
            catch (error) {
                if (isAxiosError(error)) {
                    apiError(error);
                }
                throw error;
            }
        });
    }
    function assets(ext, options) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.info('Fetching assets...');
            const cleanOptions = objectUtils.clean(options);
            logger.debug(cleanOptions);
            try {
                const resp = yield axios.get(`${baseLocaliseUrl}/api/assets.${ext}`, {
                    params: cleanOptions
                });
                return resp;
            }
            catch (error) {
                if (isAxiosError(error)) {
                    apiError(error);
                }
                throw error;
            }
        });
    }
    function progress(url, options) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.info(`progress ${url}...`);
            const cleanOptions = objectUtils.clean(options);
            logger.debug(cleanOptions);
            try {
                const resp = yield axios.get(url, {
                    params: cleanOptions
                });
                return resp;
            }
            catch (error) {
                if (isAxiosError(error)) {
                    apiError(error);
                }
                throw error;
            }
        });
    }
    function push(ext, options, data) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.info('pushing assets...');
            const cleanOptions = objectUtils.clean(options);
            const url = `${baseLocaliseUrl}/import/${ext}?${new URLSearchParams(cleanOptions)}`;
            logger.debug(url);
            logger.debug(cleanOptions);
            try {
                const resp = yield axios.post(url, data);
                return resp;
            }
            catch (error) {
                if (isAxiosError(error)) {
                    apiError(error);
                }
                throw error;
            }
        });
    }
}
export default LocaliseApi;
//# sourceMappingURL=localise-api.js.map