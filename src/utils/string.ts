export function stringTemplate(template: string, obj: Record<PropertyKey, any>, { prefixed = false } = { prefixed: false }) {
  const reg = prefixed ? /\${(.*?)}/g : /{(.*?)}/g;
  return template.replace(reg, (_, key) => obj[key.trim()]);
}
