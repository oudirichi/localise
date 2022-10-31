import axios, { AxiosError } from "axios";
import * as objectUtils from './utils/object';

import { isAxiosError } from './utils/axios';
import winston from "winston";
const baseLocaliseUrl = 'https://localise.biz:443/api';


function LocaliseApi({ logger }: { logger: winston.Logger }) {
  return {
    archive,
    assets,
    push,
    exportAll,
    progress,
  };

  ////////////////

  function apiError(error: AxiosError) {
    logger.debug(error);
    if (error?.response?.status === 401) {
      logger.error('The key you provide is unauthorized, please provide another key');
    } else {
      logger.error(`Something whent wrong. Status code: ${error?.response?.status}`);
    }
  }

  async function archive(ext: string, options: Record<string, any>): Promise<Buffer> {
    logger.info('Fetching archive...');
    const cleanOptions = objectUtils.clean(options);
    logger.debug(cleanOptions);

    try {
      const resp = await axios.get(`${baseLocaliseUrl}/export/archive/${ext}.zip`, {
        responseType: 'arraybuffer',
        params: cleanOptions,
      });

      return resp.data;
    } catch (error: any) {
      if (isAxiosError(error)) {
        apiError(error);
      }
      throw error;
    }
  }

  async function exportAll(ext: string, options: Record<string, any>): Promise<Record<PropertyKey, string>> {
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
        if (isAxiosError(error)) {
          apiError(error);
        }
        throw error;
    }
  }

  async function assets(ext: string, options: Record<string, any>) {
    logger.info('Fetching assets...');
    const cleanOptions = objectUtils.clean(options);
    logger.debug(cleanOptions);

    try {
      const resp = await axios.get(`${baseLocaliseUrl}/api/assets.${ext}`, {
        params: cleanOptions
      });

      return resp;
    } catch (error) {
      if (isAxiosError(error)) {
        apiError(error);
      }
      throw error;
    }
  }

  async function progress(url: string, options: Record<string, any>) {
    logger.info(`progress ${url}...`);
    const cleanOptions = objectUtils.clean(options);
    logger.debug(cleanOptions);

    try {
      const resp = await axios.get(url, {
        params: cleanOptions
      });

      return resp;
    } catch (error) {
      if (isAxiosError(error)) {
        apiError(error);
      }
      throw error;
    }
  }

  async function push(ext: string, options: Record<string, any>, data: string) {
    logger.info('pushing assets...');
    const cleanOptions = objectUtils.clean(options);
    const url = `${baseLocaliseUrl}/import/${ext}?${new URLSearchParams(cleanOptions)}`;
    logger.debug(url);
    logger.debug(cleanOptions);

    try {
      const resp = await axios.post(url, data);
      return resp;
    } catch (error) {
      if (isAxiosError(error)) {
        apiError(error);
      }
      throw error;
    }
  }
}

export default LocaliseApi;
