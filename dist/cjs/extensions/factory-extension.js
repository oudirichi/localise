"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const extension_1 = __importDefault(require("./extension"));
const json_extension_1 = __importDefault(require("./json-extension"));
function default_1(ext) {
    const mapped = {
        'json': json_extension_1.default,
    };
    if (ext in mapped)
        return mapped[ext];
    return extension_1.default;
}
exports.default = default_1;
//# sourceMappingURL=factory-extension.js.map