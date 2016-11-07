const requireUp = require( '.' );
const Module = require( 'module' );
const old = Module._resolveFilename;

if ( Module._resolveFilename.name !== 'requireUpPatch' ) {
  Module._resolveFilename = requireUpPatch;
}

function requireUpPatch( request, parent, isMain ) {
  if ( request.match( /^...\// ) ) {
    const modReq = request.split( '/' ).pop();
    const path = requireUp( modReq, {
      getResolvedPath: true,
      startingModule: module.parent
    } );
    return path;
  } else {
    return old.call( Module, request, parent, isMain );
  }
}
