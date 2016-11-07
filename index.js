const { resolve } = require( 'path' );
const { adjustModulePaths } = require( './utils' );

module.exports = requireUp;

function requireUp( requestedModule, {
  getResolvedPath = false,
  paths = adjustModulePaths( module.parent.paths )
} = {} ) {
  for ( dirname of paths ) try {
    const tryPath = resolve( dirname, requestedModule );
    const modulePath = require.resolve( tryPath );
    const module = require( modulePath );
    if ( getResolvedPath )
      return modulePath;
    else
      return module;
  } catch ( error ) {}
  const err = new Error( "Cannot find module '" + requestedModule + "'" );
  err.code = 'MODULE_NOT_FOUND';
  throw err;
}
