// const yaml = require('js-yaml');
// const prettyYaml = require('json-to-pretty-yaml');
// const { exitFailure } = require('../utils/exit-status');
const Extension = require('./extension');

module.exports = class YamlExtension extends Extension {
  static parse(response) {
    return response;
    // try {
    //   return JSON.parse(response);
    // } catch (e) {
    //   console.error(chalk.red('INVALID JSON'));
    //   exitFailure();
    // }
  }

  // static parse(response) {
  //   try {
  //     const data = yaml.safeLoad(response, { schema: });
  //     console.log('YamlExtension::parse', data);
  //     return data;
  //   } catch (e) {
  //     console.error(chalk.red('INVALID YAML'));
  //     exitFailure();
  //   }
  // }

  static formatText({ data, minify } = {}) {
    // return prettyYaml.stringify(data);
    // console.log('YamlExtension::formatText', data);
    return data;
  }
}
