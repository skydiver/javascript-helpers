/**
 * Gets the value at path of object.
 * If path doesn't exists, returns default value
 * (Similar to lodash _.get)
 *
 * @param obj
 * @param path
 * @param defaultValue
 * @returns {string}
 */
const _get = (obj, path, defaultValue = null) =>
  String.prototype.split
    .call(path, /[,[\].]+?/)
    .filter(Boolean)
    .reduce(
      (a, c) => (Object.hasOwnProperty.call(a, c) ? a[c] : defaultValue),
      obj
    );

module.exports = { _get };
