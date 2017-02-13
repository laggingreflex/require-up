const Module = require('module');
const {basename, dirname} = require('path');
const resolveFrom = require('resolve-from');
const getCallSites = require('callsites');
const { adjustModulePaths } = require('./utils');

module.exports = requireUp;

function requireUp(requestedModule, {
  getResolvedPath = false,
  paths
} = {}) {
  const originalRequestedModule = requestedModule;
  let label = requestedModule
  if (requestedModule.match(/^\.\.\.\//)) {
    requestedModule = requestedModule.split('.../').pop()
    label = '.../' + requestedModule;
  }
  if (!paths) {
    let callerPath = getCallSites()[0].getFileName()
    if (basename(dirname(callerPath)) === 'require-up') {
      callerPath = getCallSites()[1].getFileName()
    }
    const cache = require.cache[callerPath];
    if (require.cache[callerPath]) {
      paths = adjustModulePaths(cache.paths)
    }
  }

  for (path of paths) {
    const modulePath = resolveFrom(path, requestedModule) || resolveFrom(path, './' + requestedModule);
    if (modulePath) {
      const module = require(modulePath);
      if (getResolvedPath) {
        return modulePath;
      } else {
        return module;
      }
    }
  }

  // If a module was found this line would never have reached
  return originalRequestedModule;
}
