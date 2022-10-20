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

const saveToFile = ({
  clean,
  dest,
  locale,
  ext,
  parts,
  cleanDirFn,
  ExtensionClass,
  minify,
}) => {
  const createdFolders = {};

  logger.debug(`dest: ${dest}`);
  logger.debug(`locale: ${locale}`);
  const destPath = filePath(stringTemplate(dest, { ext, locale }));
  const destFolder = path.dirname(destPath);

  logger.debug(destPath);
  logger.debug(destFolder);

  if (!existsSync(destFolder)) {
    logger.debug(`folder does not exist... creating ${destFolder}...`);
    createDir(destFolder);
    createdFolders[destFolder] = true;
  } else if (clean && !createdFolders[destFolder]) {
    logger.debug(`cleaning folder...`);
    cleanDirFn(destFolder);
  }

  const data = locale ? parts[locale] : parts;
  logger.info(`Saving: ${destPath}`);

  fs.writeFileSync(destPath, ExtensionClass.formatText({ data, minify }));
  logger.info(' Done');
};

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
    exitStatus = false,
  } = {}
) {
  if (!validateKey(key)) {
    if (exitStatus) exitFailure();
    else return false;
  };

  const ExtensionClass = FactoryExtension(ext);

  let parts;
  if (bundled) {
    parts = await LocaliseApi.exportAll(ext, {
      'no-comments': true,
      ext,
      filter,
      format,
      index,
      key,
      order,
      status,
    });
  } else {
    const response = await LocaliseApi.archive(ext, {
      'no-comments': true,
      ext,
      filter,
      format,
      index,
      key,
      order,
      status,
    });


    try {
      logger.debug('unziping...');
      parts = unzip(response, ExtensionClass);
      logger.debug(`unziping done...`);
    } catch (error) {
      logger.error(`COULD NOT PARSE RESPONSE TO ZIP. See the following error for report: ${JSON.stringify(error)}`);
      exitFailure();
      return;
    }
  }

  logger.debug(parts);
  const cleanDirFn = cleanDirOnce();

  const saveOpts = {
    clean,
    dest,
    locale: '',
    ext,
    parts,
    cleanDirFn,
    ExtensionClass,
    minify,
  };

  if (bundled) {
    saveToFile(saveOpts);
  } else {
    Object.keys(parts).forEach((partLocale) => saveToFile({...saveOpts, locale: partLocale }));
  }

  if (exitStatus) exitSuccess();
  else return true;
}
