
const assert = require('assert')

const requireUp = require('../../../../..')

assert.deepEqual(requireUp('.../fixture'), {b: 'b'})
assert.deepEqual(requireUp('./fixture'), {b: 'b'})
assert.deepEqual(requireUp('fixture'), {b: 'b'})
