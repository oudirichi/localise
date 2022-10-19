const JsonExtension = require('./json-extension');
const Extension = require('./extension');

/**
 *
 * @param {string} ext
 * @returns {Extension}
 */
module.exports = function(ext) {
  const mapped = {
    'json': JsonExtension,
  };

  if (ext in mapped) return mapped[ext];
  return Extension;
}
