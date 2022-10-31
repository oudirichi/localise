"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringTemplate = void 0;
function stringTemplate(template, obj, { prefixed = false } = { prefixed: false }) {
    const reg = prefixed ? /\${(.*?)}/g : /{(.*?)}/g;
    return template.replace(reg, (_, key) => obj[key.trim()]);
}
exports.stringTemplate = stringTemplate;
//# sourceMappingURL=string.js.map