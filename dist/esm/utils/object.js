export function clean(objectToClean = {}, { recursive = false } = {}) {
    const newObject = {};
    Object.keys(objectToClean)
        .forEach((key) => {
        if (objectToClean[key] !== undefined) {
            const mustClean = (recursive && typeof objectToClean[key] === 'object' && objectToClean[key] !== null);
            newObject[key] = mustClean ? clean(objectToClean[key], { recursive }) : objectToClean[key];
        }
    });
    return newObject;
}
export function isObject(info) {
    return typeof info === 'object' && info !== null;
}
//# sourceMappingURL=object.js.map