const { resolve } = require('path');
const { adjustModulePaths } = require('./utils');

module.exports = requireUp;

function requireUp(requestedModule, {
  getResolvedPath = false,
  paths = adjustModulePaths(module.parent.paths)
} = {}) {
  const label = '.../' + requestedModule;
  const errors = [];
  for (dirname of paths) try {
    const tryPath = resolve(dirname, requestedModule);
    const modulePath = require.resolve(tryPath);
    const module = require(modulePath);
    if (getResolvedPath) {
      return modulePath;
    } else {
      return module;
    }
  } catch (err) {
    const erRex = requestedModule
      .replace(/^[./\\]+/, '')
      .replace(/[\\/]/g, '[\\\\/]');
    errors.push(err);
    if (err.code !== 'MODULE_NOT_FOUND' || !err.message.match(erRex)) {
      err.message = 'Error in \'' + label + '\': ' + err.message
      throw err;
    }
  }
  const error = new Error("Cannot find module '" + label + "'");
  error.code = 'MODULE_NOT_FOUND';
  error.errors = errors;
  throw error;
}
