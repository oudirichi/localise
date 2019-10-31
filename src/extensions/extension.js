module.exports = class Extension {
  constructor() {
    if (this.constructor === Extension) {
      throw new TypeError('Extension cannot be instantiated directly');
    }
  }

  static parse() {
    throw new Error('You must implement this function');
  }
}
