const { resolve, dirname } = require( 'path' );

module.exports = requireUp;

function requireUp( path, {getResolvedPath, startingModule} ) {
  function up( module ) {
    if ( !module ) {
      const err = new Error( "Cannot find module '" + path + "'" );
      err.code = 'MODULE_NOT_FOUND';
      throw err;
    }

    try {
      const tryPath = module.require.resolve( path );
      const mod = require( tryPath );
      return getResolvedPath, startingModule && tryPath || mod;
    } catch ( err ) {}
    try {
      const tryPath = require.resolve( resolve( dirname( module.filename ), path ) );
      const mod = require( tryPath );
      return getResolvedPath, startingModule && tryPath || mod;
    } catch ( err ) {}
    return up( module.parent );
  }
  return up( startingModule || module.parent );
}
