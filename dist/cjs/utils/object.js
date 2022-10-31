"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObject = exports.clean = void 0;
function clean(objectToClean = {}, { recursive = false } = {}) {
    const newObject = {};
    Object.keys(objectToClean)
        .forEach((key) => {
        if (objectToClean[key] !== undefined) {
            const mustClean = (recursive && typeof objectToClean[key] === 'object' && objectToClean[key] !== null);
            newObject[key] = mustClean ? clean(objectToClean[key], { recursive }) : objectToClean[key];
        }
    });
    return newObject;
}
exports.clean = clean;
function isObject(info) {
    return typeof info === 'object' && info !== null;
}
exports.isObject = isObject;
//# sourceMappingURL=object.js.map