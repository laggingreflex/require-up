
const assert = require('assert')

const requireUp = require('../../../../..')

assert.deepEqual(requireUp('.../fixture'), {a: 'a'})
assert.deepEqual(requireUp('./fixture'), {a: 'a'})
assert.deepEqual(requireUp('fixture'), {a: 'a'})
