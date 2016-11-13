console.warn(`WARNING: You're using 'require-up' as a module. Due to NodeJS's module caching it'll only be able to require up modules from the first parent it was required from. It's recommended to use the 'require-up/register' method instead.`);

module.exports = require('./main');
