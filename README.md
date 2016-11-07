# Require-up

Like [find-up] but for `require`.

## Install

```sh
$ npm install --save require-up
```

## Usage

Suppose you have a structure like this:

```
project
├───index.js
├───utils.js
└───foo
    └───bar
        └───some-file.js
```
If you wanted `utils.js` from `some-file.js` you'd have to do:
```js
import {stuff} from './../../utils';
```

### **The solution**

`index.js`:
```js
import 'require-up/register';
```
`some-file.js`:
```js
import pkg from '.../utils';
```

Require-up introduces a new special syntax: `'.../'` that lets you require your `utils.js` from anywhere down below.

**BEWARE**: This module monkey-patches `Module._resolveFilename` in the core [module.js].

You may also use it as a module (which doesn't patch anything) but due to NodeJS's require caching it will only be able to require modules up from the first parent it was originally required from. For that reason it's actually recommended to **use the `/register` method** which even works accross different modules.

Some other solutions: [\[1\]][1] [\[2\]][2] [\[3\]][3]

[find-up]: https://www.npmjs.com/package/find-up
[module.js]: https://github.com/nodejs/node/blob/master/lib/module.js#L458

[1]: https://gist.github.com/branneman/8048520
[2]: http://stackoverflow.com/questions/10860244/how-to-make-the-require-in-node-js-to-be-always-relative-to-the-root-folder-of-t
[3]: https://lostechies.com/derickbailey/2014/02/20/how-i-work-around-the-require-problem-in-nodejs/

