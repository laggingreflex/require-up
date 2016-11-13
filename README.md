# Require-up
[![npm](https://img.shields.io/npm/v/require-up.svg)](https://www.npmjs.com/package/require-up)

Require-up introduces a new syntax `'.../'` for requiring modules anywhere up from parent directories. Much like NodeJS's default `require`, but it also looks *outside* `node_modules` directories. Or like [find-up] but for `require`.

## Install

```sh
$ npm install --save require-up
```

## Usage

If you have a structure like this:

```
├───index.js
├───utils.js
└───foo
    └───bar
        └───some-file.js
```
Register `require-up` in your main `index.js`:
```js
// index.js
import 'require-up/register';
```

Now in `some-file.js` you can do:
```js
// some-file.js
import {stuff} from '.../utils';
```

## **CAUTION**

**BEWARE**: This module monkey-patches `Module._resolveFilename` in the core [module.js].

You may also use it as a simple module which doesn't patch anything:
```js
import requireUp from 'require-up';
requireUp('./utils'); // without ".../" syntax
```

**but** due to NodeJS's require caching it will only be able to require modules up from the **first parent** it was originally required from. For that reason it's recommended actually to use the `/register` method.


[find-up]: https://www.npmjs.com/package/find-up
[module.js]: https://github.com/nodejs/node/blob/master/lib/module.js#L458

[1]: https://gist.github.com/branneman/8048520
[2]: http://stackoverflow.com/questions/10860244/how-to-make-the-require-in-node-js-to-be-always-relative-to-the-root-folder-of-t
[3]: https://lostechies.com/derickbailey/2014/02/20/how-i-work-around-the-require-problem-in-nodejs/

