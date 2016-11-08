const { resolve } = require( 'path' );
const { adjustModulePaths } = require( './utils' );

module.exports = requireUp;

function requireUp( requestedModule, {
  getResolvedPath = false,
  paths = adjustModulePaths( module.parent.paths )
} = {} ) {
  const errors = [];
  for ( dirname of paths ) try {
    const tryPath = resolve( dirname, requestedModule );
    const modulePath = require.resolve( tryPath );
    const module = require( modulePath );
    if ( getResolvedPath ) {
      return modulePath;
    } else {
      return module;
    }
  } catch ( error ) {
    errors.push( error );
    if ( error.code !== 'MODULE_NOT_FOUND' ) {
      throw error;
    }
  }
  const error = new Error( "Cannot find module '" + requestedModule + "'" );
  error.code = 'MODULE_NOT_FOUND';
  error.errors = errors;
  throw error;
}
