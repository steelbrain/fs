/* @flow */

import FS from 'fs'
import promisify from 'sb-promisify'

const promisifiedFS = {}

for (const key in FS) {
  if (!{}.hasOwnProperty.call(FS, key)) {
    continue
  }
  const value = FS[key]
  if (typeof value === 'function') {
    promisifiedFS[key] = promisify(value)
  } else {
    promisifiedFS[key] = value
  }
}

module.exports = promisifiedFS
