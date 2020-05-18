const cmd = require('node-cmd');
const { promisify } = require('util');

/**
 * Asynchronously Run console commands and return the result
 *
 * @param exec
 * @returns {Promise}
 */
const asyncCmd = async (exec) => {
  try {
    const getAsync = promisify(cmd.get);
    const result = await getAsync(exec);
    return result;
  } catch (error) {
    return undefined;
  }
};

module.exports = asyncCmd;
