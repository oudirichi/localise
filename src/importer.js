const path = require('path');
const chalk = require('chalk');
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
const LocaliseApi = require('./api');
const fs = require('fs');

var AdmZip = require('adm-zip');

module.exports = async function (
  {
    bundled = false,
    clean,
    dest,
    ext = 'json',
    filter,
    format,
    index,
    key = process.env.LOCALISE_KEY,
    minify = false,
    order,
    status,
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

  let zip, zipEntries;

  try {
    zip = new AdmZip(response.data);
    zipEntries = zip.getEntries();
  } catch (error) {
    console.error(chalk.red('COULD NOT PARSE RESPONSE TO ZIP. See the following error for report: ', error));
    exitFailure();
  }

  const parts = {};

  const getEntryLocale = (entry) => entry.entryName.match(/archive\/locales?\/([a-z]+).*/i)[1];

  zipEntries.forEach((entry) => {
    if (entry.entryName.match(/readme/i)) return;

    const data = zip.readAsText(entry);
    const locale = getEntryLocale(entry);

    parts[locale] = ExtensionClass.parse(data);
  });

  const createdFolders = {};
  const cleanDirFn = cleanDirOnce();

  const saveToFile = (locale) => {
    const destPath = filePath(stringTemplate(dest, { ext, locale }));
    const destFolder = path.dirname(destPath);

    if (!existsSync(destFolder)) {
      createDir(destFolder);
      createdFolders[destFolder] = true;
    } else {
      if (clean && !createdFolders[destFolder]) cleanDirFn(destFolder);
    }

    const data = locale ? parts[locale] : parts;
    process.stdout.write(`Saving: ${destPath}`);
    fs.writeFileSync(destPath, ExtensionClass.formatText({ data, minify }));
    process.stdout.write(chalk.green(' Done\r\n'));
  };

  if (bundled) {
    saveToFile();
  } else {
    Object.keys(parts).forEach(saveToFile);
  }

  exitSuccess();
}
