import { validateKey } from './utils/validation';
import { sleep } from './utils/promise';
import { promises as fs } from "fs";
import { exitFailure, exitSuccess } from './utils/exit-status';

import logger from './services/logger';
import LocaliseApi from './localise-api';

const localiseApi = LocaliseApi({ logger });

import {
  filePath,
} from './utils/file';

export default async function Extractor({
  ignoreExisting = true,
  async = false,
  locale='en',
  key = process.env.LOCALISE_KEY,
  file = '',
  tagNew =null,
  ext = '',
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

  if (!ext) ext = file.split('.').pop()!;

  const path = filePath(file);
  const data = await fs.readFile(path, 'utf8');

  const result = await localiseApi.push(ext, {
    'ignore-existing': ignoreExisting,
    'tag-new': tagNew,
    async,
    locale,
    key,
  }, data);

  if (result.status === 200) {
    logger.info(`completed`);

    const msg = result.data;
    logger.info(JSON.stringify({
      status: msg.status,
      message: msg.message,
      code: msg?.locales?.code,
      assets: msg.assets,
    }, null, 2));
  }
  else if (result.status === 201) {
    let completed = false;
    const location: string = result.headers.location!;
    while(!completed) {
      try {
        const progressRes = await localiseApi.progress(location, { key });

        logger.info(`importation progress... ${progressRes.data.progress}/100`);
        if (progressRes.data.progress == 100) {
          logger.info(`completed`);
          console.log(progressRes.data);

          completed = true;
        } else {
          await sleep(1000);
        }
      } catch (error) {
        logger.error(error);
        completed = true;
      }
    }
  }

  if (exitStatus) exitSuccess();
  else return true;
}
