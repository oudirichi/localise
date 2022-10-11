const JsonExtension = require('./json-extension');
const YamlExtension = require('./yaml-extension');
const Extension = require('./extension');

/**
 *
 * @param {string} ext
 * @returns {Extension}
 */
module.exports = function(ext) {
  const mapped = {
    'json': JsonExtension,
    'yaml': YamlExtension,
  };

  if (ext in mapped) return mapped[ext];
  return Extension;
}
