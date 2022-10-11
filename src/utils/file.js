const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

function emptyDir(directoryPath) {
  const files = fs.readdirSync(directoryPath);
  for (const file of files) {
    const filePath = path.join(directoryPath, file);
    fs.unlinkSync(filePath);
  }
}

function filePath(filePathToTransforme) {
  return (filePathToTransforme[0] === '/' || filePathToTransforme[0] === '\\') ?
    path.join(filePathToTransforme) :
    path.join(process.cwd(), filePathToTransforme);
}

function createDir(destFolder) {
  console.log(chalk.green(`Creating folder: ${destFolder}`));
  fs.mkdirSync(destFolder, { recursive: true });
}

function cleanDir(destFolder) {
  console.log(chalk.green(`cleaning folder: ${destFolder}`));
  return emptyDir(destFolder);
}

function cleanDirOnce() {
  const cacheFolder = {};

  return (destPath) => {
    if (cacheFolder[destPath]) return;

    cleanDir(destPath);
    cacheFolder[destPath] = true;
  };
}

module.exports = {
  createDir,
  cleanDir,
  cleanDirOnce,
  existsSync: fs.existsSync,
  filePath,
}
