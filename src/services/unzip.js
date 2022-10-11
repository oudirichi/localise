const AdmZip = require('adm-zip');
const Extension = require('../extensions/extension');

function Zip({ logger }) {

  /**
   * @param {Buffer} content
   * @param {Extension} ExtensionClass
   * @returns {Object.<string, string>}
   */
  return function(content, ExtensionClass) {
    const zip = new AdmZip(content);
    const entries = zip.getEntries();
    logger.debug(`entries ${JSON.stringify(entries)}`);
    const parts = {};

    const getEntryLocale = (entry) => entry.entryName.match(/archive\/locales?\/([a-z]+).*/i)[1];

    logger.debug(`looping entries`);
    entries.forEach((entry) => {
      if (entry.entryName.match(/readme/i)) return;

      const data = zip.readAsText(entry);
      const locale = getEntryLocale(entry);
      logger.debug(`${locale} - ${data}`);

      parts[locale] = ExtensionClass.parse(data);
    });

    return parts;
  }
}
module.exports = Zip;
