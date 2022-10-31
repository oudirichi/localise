const path = require('path');
const fs = require('fs');

export function emptyDir(directoryPath: string): void {
  const files = fs.readdirSync(directoryPath);
  for (const file of files) {
    const filePath = path.join(directoryPath, file);
    fs.unlinkSync(filePath);
  }
}

export function filePath(filePathToTransforme: string): string {
  return (filePathToTransforme[0] === '/' || filePathToTransforme[0] === '\\') ?
    path.join(filePathToTransforme) :
    path.join(process.cwd(), filePathToTransforme);
}

export function createDir(destFolder: string) {
  return fs.mkdirSync(destFolder, { recursive: true });
}

export function cleanDir(destFolder: string) {
  return emptyDir(destFolder);
}

export type cleanDirOnceResult = (destPath: string, onClean?: () => void) => void;

export function cleanDirOnce(): cleanDirOnceResult {
  const cacheFolder: Record<string, boolean> = {};

  return (destPath, onClean) => {
    if (cacheFolder[destPath]) return;

    if (onClean) onClean();
    cleanDir(destPath);
    cacheFolder[destPath] = true;
  };
}

export const existsSync = fs.existsSync;
