const axios = require('axios');
const { exitFailure } = require('./utils/exit-status');
const objectUtils = require('./utils/object');

const baseLocaliseUrl = 'https://localise.biz:443/api';

function LocaliseApi({ logger }) {
  return {
    archive,
    assets,
    push,
    exportAll,
    progress,
  };

  ////////////////

  function apiError(error) {
    logger.debug(error);
    if (error.response.status === 401) {
      logger.error('The key you provide is unauthorized, please provide another key');
    } else {
      logger.error(`Something whent wrong. Status code: ${error.response.status}`);
    }

    exitFailure();
  }

  /**
   *
   * @param {string} ext
   * @param {Object.<string, any>} options
   * @returns {Promise<Buffer>}
   */
  async function archive(ext, options) {
    logger.info('Fetching archive...');
    const cleanOptions = objectUtils.clean(options);
    logger.debug(cleanOptions);

    try {
      const resp = await axios.get(`${baseLocaliseUrl}/export/archive/${ext}.zip`, {
        responseType: 'arraybuffer',
        params: cleanOptions,
      });

      return resp.data;
    } catch (error) {
      apiError(error);
    }
  }

  /**
   *
   * @param {string} ext
   * @param {Object.<string, any>} options
   * @returns {Promise<String|Object>}
   */
  async function exportAll(ext, options) {
    logger.info('Fetching assets...');
    const url = `${baseLocaliseUrl}/export/all.${ext}`;
    const cleanOptions = objectUtils.clean(options);
    logger.debug(url);
    logger.debug(cleanOptions);

    try {
      const resp = await axios.get(url, {
        params: cleanOptions
      });

      return resp.data;
    } catch (error) {
      apiError(error);
    }
  }

  async function assets(ext, options) {
    logger.info('Fetching assets...');
    const cleanOptions = objectUtils.clean(options);
    logger.debug(cleanOptions);

    try {
      const resp = await axios.get(`${baseLocaliseUrl}/api/assets.${ext}`, {
        params: cleanOptions
      });

      return resp;
    } catch (error) {
      apiError(error);
    }
  }

  async function progress(url, options) {
    logger.info(`progress ${url}...`);
    const cleanOptions = objectUtils.clean(options);
    logger.debug(cleanOptions);

    try {
      const resp = await axios.get(url, {
        params: cleanOptions
      });

      return resp;
    } catch (error) {
      apiError(error);
    }
  }

  async function push(ext, options, data) {
    logger.info('pushing assets...');
    const cleanOptions = objectUtils.clean(options);
    const url = `${baseLocaliseUrl}/import/${ext}?${new URLSearchParams(cleanOptions)}`;
    logger.debug(url);
    logger.debug(cleanOptions);

    try {
      const resp = await axios.post(url, data);
      return resp;
    } catch (error) {
      apiError(error);
    }
  }
}

module.exports = LocaliseApi;
