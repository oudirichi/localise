function stringTemplate(template, obj) {
  return template.replace(/\${(.*?)}/g, (_, key) => obj[key.trim()]);
}

module.exports = {
  stringTemplate,
}
