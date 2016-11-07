# require-up

Like `require` but looks up `module.parent.parent...`

```
├───your-package
│   ├───package.json
│   ├───src
│   │   ├───config
│   │   │   ├───this-file.js
```
```js
const requireUp = require('require-up');

const pkg = requireUp('./package.json')
```
This will require your `package.json` from anywhere in your module.

---


You can also `register` it and use this new syntax: `.../`

Before any other imports/requires:
```js
import 'require-up/register';
```
Then anywhere else:
```js
import pkg from '.../package.json';
```

WARNING: This [monkey-patches] `Module._resolveFilename` in [module.js]

[module.js]: https://github.com/nodejs/node/blob/master/lib/module.js#L458
