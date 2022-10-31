import AdmZip from 'adm-zip';
import winston from "winston";

function Zip({ logger }: { logger: winston.Logger }) {

  return function(content: Buffer): { [key: string]: string } {
    const zip = new AdmZip(content);
    const entries = zip.getEntries();
    logger.debug(`entries ${JSON.stringify(entries)}`);
    const parts: { [key: string]: string } = {};

    const getEntryLocale = (entry: AdmZip.IZipEntry) => {
        const matches = entry.entryName.match(/archive\/locales?\/([a-z]+).*/i);
        return matches ? matches[1] : '';
    };

    logger.debug(`looping entries`);
    entries.forEach((entry) => {
      if (entry.entryName.match(/readme/i)) return;

      const data = zip.readAsText(entry);
      const locale = getEntryLocale(entry);
      logger.debug(`${locale} - ${data}`);

      parts[locale] = data;
    });

    return parts;
  }
}
export default Zip;
