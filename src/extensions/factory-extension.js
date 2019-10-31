const JsonExtension = require('./json-extension');
const YamlExtension = require('./yaml-extension');
const chalk = require('chalk');


module.exports = function(ext) {
  const mapped = {
    'json': JsonExtension,
    'yaml': YamlExtension,
  };

  if (mapped[ext]) return mapped[ext];

  console.error(chalk.red('Extension not supported!'));
}
