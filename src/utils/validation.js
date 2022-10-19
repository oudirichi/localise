const { exitFailure } = require('./exit-status');
const chalk = require('chalk');

module.exports = {
  /**
   *
   * @param {string|undefined|null} key
   */
  validateKey(key) {
    if (!key) {
      console.error(chalk.red('No API KEY provided. Please use -k <YOUR KEY> or by the a environment variable <LOCALISE_KEY>'));
      return false;
    }

    return true;
  },
}
