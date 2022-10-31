const chalk = require('chalk');

export function validateKey(key: string|undefined|null) {
  if (!key) {
    return false;
  }

  return true;
}
