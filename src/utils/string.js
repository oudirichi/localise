// @ts-check

/**
 *
 * @param {string} template
 * @param {Object<string, any>} obj
 * @returns {string}
 */
function stringTemplate(template, obj) {
  return template.replace(/\${(.*?)}/g, (_, key) => obj[key.trim()]);
}

module.exports = {
  stringTemplate,
}
