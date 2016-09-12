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

promisifiedFS.rimraf = promisify(require('rimraf'))
promisifiedFS.mkdirp = promisify(require('mkdirp'))
promisifiedFS.exists = function(path: string) {
  return new Promise(function(resolve) {
    FS.access(path, function(error) {
      resolve(error === null)
    })
  })
}

module.exports = promisifiedFS
