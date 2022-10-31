"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAxiosError = void 0;
const axios_1 = __importDefault(require("axios"));
function isAxiosError(error) {
    return axios_1.default.isAxiosError(error);
}
exports.isAxiosError = isAxiosError;
//# sourceMappingURL=axios.js.map