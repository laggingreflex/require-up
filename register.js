const requireUp = require('.');
const Module = require('module');
const { adjustModulePaths } = require('./utils');

const old = Module.__resolveFilename = Module._resolveFilename;

if (Module._resolveFilename.name !== 'requireUpPatch') {
  Module._resolveFilename = requireUpPatch;
}

function requireUpPatch(request, parent, isMain) {
  if (request.match(/^\.\.\.\//)) {
    const path = requireUp(request, {
      getResolvedPath: true,
      paths: adjustModulePaths(parent.paths)
    });
    return path;
  } else {
    return old.call(Module, request, parent, isMain);
  }
}
