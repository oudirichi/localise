const chalk = require('chalk');
const axios = require('axios');
const { exitFailure } = require('./utils/exit-status');
const objectUtils = require('./utils/object');

const baseLocaliseUrl = 'https://localise.biz:443/api';

function apiError(error) {
  if (error.response.status === 401) {
    console.error(chalk.red('The key you provide is unauthorized, please provide another key'));
  } else {
    console.error(chalk.red(`Something whent wrong. Status code: ${error.response.status}`));
  }

  exitFailure();
}

async function archive(ext, options) {
  console.log(chalk.green('Fetching archive...'));
  const cleanOptions = objectUtils.clean(options);

  try {
    const resp = await axios.get(`${baseLocaliseUrl}/export/archive/${ext}.zip`, {
      responseType: 'arraybuffer',
      params: cleanOptions,
    });

    return resp;
  } catch (error) {
    apiError(error);
  }
}

async function assets(ext, options) {
  console.log(chalk.green('Fetching assets...'));
  const cleanOptions = objectUtils.clean(options);

  try {
    const resp = await axios.get(`${baseLocaliseUrl}/api/assets.${ext}`, {
      params: cleanOptions
    });

    return resp;
  } catch (error) {
    apiError(error);
  }
}

module.exports = {
  archive,
  assets,
}
