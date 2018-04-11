/* eslint-disable */
const error = (message, ...args) =>
  console.error(message, args);

const warn = (message, ...args) =>
  console.warn(message, args);

const info = (message, ...args) =>
  console.log(message, args);
/* eslint-enable */


module.exports = {
  error,
  warn,
  info,
};
