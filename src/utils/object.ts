export function clean(objectToClean: Record<PropertyKey, any> = {}, { recursive = false } = {}) {
  const newObject: Record<PropertyKey, any> = {};

  Object.keys(objectToClean)
    .forEach((key) => {
      if (objectToClean[key] !== undefined) {
        const mustClean = (recursive && typeof objectToClean[key] === 'object' && objectToClean[key] !== null);
        newObject[key] = mustClean ? clean(objectToClean[key], { recursive }) : objectToClean[key];
      }
    });

  return newObject;
}

export function isObject(info: any): info is Object {
  return typeof info === 'object' && info !== null;
}
