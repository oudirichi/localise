import Extension from './extension';
import JsonExtension from './json-extension';
export default function (ext) {
    const mapped = {
        'json': JsonExtension,
    };
    if (ext in mapped)
        return mapped[ext];
    return Extension;
}
//# sourceMappingURL=factory-extension.js.map