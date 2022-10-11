const chalk = require('chalk');
const { exitFailure } = require('../utils/exit-status');
const Extension = require('./extension');

module.exports = class JsonExtension extends Extension {
  static parse(response) {
    try {
      return JSON.parse(response);
    } catch (e) {
      console.error(chalk.red('INVALID JSON'));
      exitFailure();
    }
  }

  static bundle(...arr) {
    return arr.reduce((acc, item) => ({ ...acc, ...item }), {});
  }

  static formatText({ data, minify } = {}) {
    const jsonIndent = 2;
    const jsonCompressIndent = 0;
    return JSON.stringify(data, null, minify ? jsonCompressIndent : jsonIndent);
  }
}
