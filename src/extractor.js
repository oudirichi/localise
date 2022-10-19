const { validateKey } = require('./utils/validation');
const { sleep } = require('./utils/promise');
const fs = require('fs').promises;

const logger = require('./services/logger');
const LocaliseApi = require('./localise-api')({ logger });

const {
  filePath,
} = require('./utils/file');

module.exports = async function ({
  ignoreExisting = true,
  async = false,
  locale='en',
  key = process.env.LOCALISE_KEY,
  file,
  tagNew =null,
  ext = null,
  exitStatus = false,
 } = {}
) {
  if (!validateKey(key)) {
    if (exitStatus) exitFailure();
    else return false;
  };

  if (!ext) ext = file.split('.').pop();

  const path = filePath(file);
  const data = await fs.readFile(path, 'utf8');

  const result = await LocaliseApi.push(ext, {
    'ignore-existing': ignoreExisting,
    'tag-new': tagNew,
    async,
    locale,
    key,
  }, data);

  if (result.status === 200) {
    logger.info(`completed`);

    /** @type {Object<string, any>} */
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
    while(!completed) {
      try {
        const progressRes = await LocaliseApi.progress(result.headers.location, { key });

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
