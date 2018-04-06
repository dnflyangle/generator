/* eslint-disable */
const error = (message, ...args) =>
  console.error(message, args);

const warn = (message, ...args) =>
  warnLoggingEnabled && console.warn(message, args);

const debug = (message, ...args) =>
  debugLoggingEnabled && console.log(message, args);
/* eslint-enable */

module.exports = {
  error,
  warn,
  debug,
};
