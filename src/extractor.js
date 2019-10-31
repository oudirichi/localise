const { exitFailure } = require('./utils/exit-status');
const { validateKey } = require('./utils/validation');
const FactoryExtension = require('./extensions/factory-extension');
const LocaliseApi = require('./api');
const {
  filePath,
} = require('./utils/file');

const fs = require('fs');
const path = require('path');
module.exports = async function (
  {
    file,
    key = process.env.LOCALISE_KEY,
  } = {}
) {
  console.error(chalk.red('NOT YET IMPLEMENTED'));
  exitFailure();

  validateKey(key);
  const extFile = file.substring(file.indexOf('.')+1)
  const ExtensionClass = FactoryExtension(extFile);

  const data = ExtensionClass.parse(fs.readFileSync(filePath(file), 'utf8'));
  // const currentAssets = LocaliseApi.assets(extFile);

}
