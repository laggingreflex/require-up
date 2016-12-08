# Require-up
[![npm](https://img.shields.io/npm/v/require-up.svg)](https://www.npmjs.com/package/require-up)

Require modules from anywhere up the parent directories. Like [find-up] but for `require`.

Optionally, a new syntax (`'.../'`) which will work with regular require/import calls.

## Install

```sh
$ npm install --save require-up
```

## Usage

If you have a structure like this:

```
proj
├───index.js
├───utils.js
└───foo
    └───bar
        └───some-file.js
```
```js
// proj/foo/bar/some-file.js
const requireUp = require('require-up')
const { utils } = requireUp('utils')
```
It will look for (in this order):
```
proj/foo/bar/node_modules/utils
proj/foo/bar/utils
proj/foo/node_modules/utils
proj/foo/utils
proj/node_modules/utils
proj/utils # << found
```

## Register

A new syntax (`'.../'`) which will work with regular require/import calls.

```js
// proj/index.js
import 'require-up/register'
```
```js
// proj/foo/bar/some-file.js
import utils from '.../utils'
```


### **CAUTION**

BEWARE: Registering new syntax patches core [module.js]'s `Module._resolveFilename`.


[find-up]: https://www.npmjs.com/package/find-up
[module.js]: https://github.com/nodejs/node/blob/master/lib/module.js#L458

[1]: https://gist.github.com/branneman/8048520
[2]: http://stackoverflow.com/questions/10860244/how-to-make-the-require-in-node-js-to-be-always-relative-to-the-root-folder-of-t
[3]: https://lostechies.com/derickbailey/2014/02/20/how-i-work-around-the-require-problem-in-nodejs/

