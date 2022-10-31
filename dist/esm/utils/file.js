const path = require('path');
const fs = require('fs');
export function emptyDir(directoryPath) {
    const files = fs.readdirSync(directoryPath);
    for (const file of files) {
        const filePath = path.join(directoryPath, file);
        fs.unlinkSync(filePath);
    }
}
export function filePath(filePathToTransforme) {
    return (filePathToTransforme[0] === '/' || filePathToTransforme[0] === '\\') ?
        path.join(filePathToTransforme) :
        path.join(process.cwd(), filePathToTransforme);
}
export function createDir(destFolder) {
    return fs.mkdirSync(destFolder, { recursive: true });
}
export function cleanDir(destFolder) {
    return emptyDir(destFolder);
}
export function cleanDirOnce() {
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
export const existsSync = fs.existsSync;
//# sourceMappingURL=file.js.map