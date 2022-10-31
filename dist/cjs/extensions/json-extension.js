"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const extension_1 = __importDefault(require("./extension"));
class JsonExtension extends extension_1.default {
    static parse(response) {
        return JSON.parse(response);
    }
    static formatText({ data, minify }) {
        const jsonIndent = 2;
        const jsonCompressIndent = 0;
        return JSON.stringify(data, null, minify ? jsonCompressIndent : jsonIndent);
    }
}
exports.default = JsonExtension;
//# sourceMappingURL=json-extension.js.map