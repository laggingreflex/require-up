const { join } = require('path');

module.exports = { adjustModulePaths };

function adjustModulePaths(paths) {
  return paths.map(path => join(path, '..'));
}
