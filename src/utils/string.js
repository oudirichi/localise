// @ts-check

/**
 *
 * @param {string} template
 * @param {Object<string, any>} obj
 * @param {Object} config
 * @param {boolean} config.prefixed
 * @returns {string}
 */
function stringTemplate(template, obj, { prefixed = false } = { prefixed: false }) {
  const reg = prefixed ? /\${(.*?)}/g : /{(.*?)}/g;
  return template.replace(reg, (_, key) => obj[key.trim()]);
}

module.exports = {
  stringTemplate,
}
