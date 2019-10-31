const yaml = require('js-yaml');
const { exitFailure } = require('../utils/exit-status');

module.exports = class JsonExtension {
  static parse(response) {
    try {
      return yaml.safeLoad(response);
    } catch (e) {
      console.error(chalk.red('INVALID YAML'));
      exitFailure();
    }
  }
}
