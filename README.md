# require-up

Looks up files in parent dirs outside `node_modules`.

```
├───your-package
│   ├───package.json
│   ├───src
│   │   ├───config
│   │   │   ├───in-this-file.js:
```
```js
const requireUp = require('require-up');

const pkg = requireUp('./package.json');
```
This will require your `package.json` from anywhere in your module.

---


You can also `register` it and use this new 3 dot syntax: `.../`

Before any other imports/requires:
```js
import 'require-up/register';
```
Then anywhere else:
```js
import pkg from '.../package.json';
```

BEWARE: This monkey-patches `Module._resolveFilename` in [module.js] core.

[module.js]: https://github.com/nodejs/node/blob/master/lib/module.js#L458
