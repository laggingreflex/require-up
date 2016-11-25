const requireUp = require('./main');
const Module = require('module');
const { adjustModulePaths } = require('./utils');

const old = Module._resolveFilename;

if (Module._resolveFilename.name !== 'requireUpPatch') {
  Module._resolveFilename = requireUpPatch;
}

function requireUpPatch(request, parent, isMain) {
  if (request.match(/^\.\.\.\//)) {
    const modReq = request.split('.../').pop();
    const path = requireUp(modReq, {
      getResolvedPath: true,
      paths: adjustModulePaths(parent.paths)
    });
    return path;
  } else {
    return old.call(Module, request, parent, isMain);
  }
}
