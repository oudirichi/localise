"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.existsSync = exports.cleanDirOnce = exports.cleanDir = exports.createDir = exports.filePath = exports.emptyDir = void 0;
const path = require('path');
const fs = require('fs');
function emptyDir(directoryPath) {
    const files = fs.readdirSync(directoryPath);
    for (const file of files) {
        const filePath = path.join(directoryPath, file);
        fs.unlinkSync(filePath);
    }
}
exports.emptyDir = emptyDir;
function filePath(filePathToTransforme) {
    return (filePathToTransforme[0] === '/' || filePathToTransforme[0] === '\\') ?
        path.join(filePathToTransforme) :
        path.join(process.cwd(), filePathToTransforme);
}
exports.filePath = filePath;
function createDir(destFolder) {
    return fs.mkdirSync(destFolder, { recursive: true });
}
exports.createDir = createDir;
function cleanDir(destFolder) {
    return emptyDir(destFolder);
}
exports.cleanDir = cleanDir;
function cleanDirOnce() {
    const cacheFolder = {};
    return (destPath, onClean) => {
        if (cacheFolder[destPath])
            return;
        if (onClean)
            onClean();
        cleanDir(destPath);
        cacheFolder[destPath] = true;
    };
}
exports.cleanDirOnce = cleanDirOnce;
exports.existsSync = fs.existsSync;
//# sourceMappingURL=file.js.map