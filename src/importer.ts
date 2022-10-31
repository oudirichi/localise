import path from 'path';
import { exitFailure, exitSuccess } from './utils/exit-status';
import { validateKey } from './utils/validation';
import { stringTemplate } from './utils/string';
import {
  createDir,
  cleanDirOnce,
  filePath,
  existsSync,
  cleanDirOnceResult,
} from './utils/file';
import fs from 'fs';

import logger from './services/logger';
import Unzip from './services/unzip';
import LocaliseApi from './localise-api';

const unzip = Unzip({ logger });
const localiseApi = LocaliseApi({ logger });

const saveToFile = ({
  clean,
  dest,
  locale,
  ext,
  parts,
  cleanDirFn,
}: {
  clean: boolean,
  dest: string,
  locale: string,
  ext: string,
  parts: Record<PropertyKey, string>,
  cleanDirFn: cleanDirOnceResult,
}) => {

  logger.debug(`dest: ${dest}`);
  logger.debug(`locale: ${locale}`);
  const destPath = filePath(stringTemplate(dest, { ext, locale }));
  const destFolder = path.dirname(destPath);

  logger.debug(destPath);
  logger.debug(destFolder);

  if (!existsSync(destFolder)) {
    logger.debug(`folder does not exist... creating ${destFolder}...`);
    createDir(destFolder);
  } else if (clean) {
      cleanDirFn(destFolder, () => {
        logger.debug(`cleaning folder...`);
    });
  }

  const data = locale ? parts[locale] : parts;
  logger.info(`Saving: ${destPath}`);

  fs.writeFileSync(destPath, (typeof data === 'string') ? data : JSON.stringify(data));
  logger.info(' Done');
};

export default async function Importer(
  {
    bundled = false,
    clean = false,
    dest = '',
    ext = 'json',
    filter = null,
    format = null,
    index = null,
    key = process.env.LOCALISE_KEY,
    order = null,
    status = null,
    exitStatus = false,
  } = {}
) {
  if (!validateKey(key)) {
    if (exitStatus) {
        logger.error('No API KEY provided. Please use -k <YOUR KEY> or by the a environment variable <LOCALISE_KEY>');
        exitFailure();
    } else {
        return false;
    }
  };

  let parts;
  if (bundled) {
    parts = await localiseApi.exportAll(ext, {
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
    const response = await localiseApi.archive(ext, {
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
      parts = unzip(response);
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
  };

  if (bundled) {
    saveToFile(saveOpts);
  } else {
    Object.keys(parts).forEach((partLocale) => saveToFile({...saveOpts, locale: partLocale }));
  }

  if (exitStatus) exitSuccess();
  else return true;
}