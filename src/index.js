/* @flow */

import FS from 'fs'
import promisify from 'sb-promisify'
import stripBomBuf from 'strip-bom-buf'

const promisifiedFS = {}
const syncMethods = ['Stats', '_toUnixTimestamp', 'watch', 'watchFile', 'unwatchFile', 'createReadStream', 'ReadStream', 'FileReadStream', 'createWriteStream', 'WriteStream', 'FileWriteStream']

for (const key in FS) {
  if (!{}.hasOwnProperty.call(FS, key)) {
    continue
  }
  const value = FS[key]
  if (typeof value === 'function' && key.indexOf('Sync') === -1 && syncMethods.indexOf(key) === -1) {
    promisifiedFS[key] = promisify(value)
  } else {
    promisifiedFS[key] = value
  }
}

promisifiedFS.exists = function(path: string) {
  return new Promise(function(resolve) {
    FS.access(path, FS.R_OK, function(error) {
      resolve(error === null)
    })
  })
}
promisifiedFS.readFile = function(path: string, encoding: ?string) {
  return new Promise(function(resolve, reject) {
    FS.readFile(path, function(error, buffer) {
      if (error) {
        reject(error)
        return
      }
      let contents = stripBomBuf(buffer)
      if (encoding) {
        contents = contents.toString(encoding)
      }
      resolve(contents)
    })
  })
}

module.exports = promisifiedFS
