const { exitFailure } = require('./exit-status');

module.exports = {
  validateKey(key) {
    if (!key) {
      console.error(chalk.red('No API KEY provided. Please use -k <YOUR KEY> or by the a environment variable <LOCALISE_KEY>'));
      exitFailure();
    }
  },
}
