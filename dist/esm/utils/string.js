export function stringTemplate(template, obj, { prefixed = false } = { prefixed: false }) {
    const reg = prefixed ? /\${(.*?)}/g : /{(.*?)}/g;
    return template.replace(reg, (_, key) => obj[key.trim()]);
}
//# sourceMappingURL=string.js.map