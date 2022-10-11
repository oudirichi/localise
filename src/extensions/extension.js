module.exports = class Extension {
  /**
   *
   * @param {string} response
   * @returns {string}
   */
  static parse(response) {
    return response;
  }

   /**
   *
   * @param {Object} param
   * @param {boolean} param.minify
   * @param {string} param.data
   * @returns {boolean}
   */
  static formatText({ data } = {}) {
    return data;
  }
}
