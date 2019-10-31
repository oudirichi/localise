const chalk = require('chalk');
const axios = require('axios');

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
  try {
    console.log(chalk.green('Fetching archive...'));
    const resp = await axios.get(`${baseLocaliseUrl}/api/export/archive/${ext}.zip`, {
      responseType: 'arraybuffer',
      params: options
    });

    return resp;
  } catch (error) {
    apiError(error);
  }
}

async function assets(ext, options) {
  try {
    console.log(chalk.green('Fetching assets...'));
    const resp = await axios.get(`${baseLocaliseUrl}/api/assets.${ext}`, {
      params: options
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
