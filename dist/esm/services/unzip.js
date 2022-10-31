import AdmZip from 'adm-zip';
function Zip({ logger }) {
    return function (content) {
        const zip = new AdmZip(content);
        const entries = zip.getEntries();
        logger.debug(`entries ${JSON.stringify(entries)}`);
        const parts = {};
        const getEntryLocale = (entry) => {
            const matches = entry.entryName.match(/archive\/locales?\/([a-z]+).*/i);
            return matches ? matches[1] : '';
        };
        logger.debug(`looping entries`);
        entries.forEach((entry) => {
            if (entry.entryName.match(/readme/i))
                return;
            const data = zip.readAsText(entry);
            const locale = getEntryLocale(entry);
            logger.debug(`${locale} - ${data}`);
            parts[locale] = data;
        });
        return parts;
    };
}
export default Zip;
//# sourceMappingURL=unzip.js.map