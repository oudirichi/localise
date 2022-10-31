import Extension from './extension';
export default class JsonExtension extends Extension {
    static parse(response) {
        return JSON.parse(response);
    }
    static formatText({ data, minify }) {
        const jsonIndent = 2;
        const jsonCompressIndent = 0;
        return JSON.stringify(data, null, minify ? jsonCompressIndent : jsonIndent);
    }
}
//# sourceMappingURL=json-extension.js.map