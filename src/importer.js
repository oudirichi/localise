// @ts-check

const path = require('path');
const FactoryExtension = require('./extensions/factory-extension');
const { exitFailure, exitSuccess } = require('./utils/exit-status');
const { validateKey } = require('./utils/validation');
const { stringTemplate } = require('./utils/string');
const {
  createDir,
  cleanDirOnce,
  filePath,
  existsSync,
} = require('./utils/file');
const fs = require('fs');
const logger = require('./services/logger');
const unzip = require('./services/unzip')({ logger });
const LocaliseApi = require('./localise-api')({ logger });

module.exports = async function (
  {
    bundled = false,
    clean = false,
    dest = '',
    ext = 'json',
    filter = null,
    format = null,
    index = null,
    key = process.env.LOCALISE_KEY,
    minify = false,
    order = null,
    status = null,
  } = {}
) {
  validateKey(key);

  const ExtensionClass = FactoryExtension(ext);
  const response = await LocaliseApi.archive(ext, {
    'no-comments': true,
    ext,
    filter,
    format,
    index,
    key,
    order,
    status,
    v: '',
  });


  let parts;
  try {
    logger.debug('unziping...');
    parts = unzip(response, ExtensionClass);
  } catch (error) {
    logger.error(`COULD NOT PARSE RESPONSE TO ZIP. See the following error for report: ${JSON.stringify(error)}`);
    exitFailure();
    return;
  }
  console.log(parts);
  logger.debug(`unziping done...`);
  const cleanDirFn = cleanDirOnce();

  const saveToFile = (locale) => {
    const createdFolders = {};

    const destPath = filePath(stringTemplate(dest, { ext, locale }));
    const destFolder = path.dirname(destPath);

    if (!existsSync(destFolder)) {
      createDir(destFolder);
      createdFolders[destFolder] = true;
    } else {
      if (clean && !createdFolders[destFolder]) cleanDirFn(destFolder);
    }

    const data = locale ? parts[locale] : parts;
    logger.info(`Saving: ${destPath}`);
    // @ts-ignore
    fs.writeFileSync(destPath, ExtensionClass.formatText({ data, minify }));
    logger.info(' Done');
  };

  if (bundled) {
    saveToFile();
  } else {
    Object.keys(parts).forEach(saveToFile);
  }

  exitSuccess();
}
