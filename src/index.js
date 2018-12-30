/* @flow */

import fs from 'fs'
import promisify from 'sb-promisify'
import stripBomBuf from 'strip-bom-buf'

const promisifiedFS = {}
const syncMethods = ['Stats', '_toUnixTimestamp', 'watch', 'watchFile', 'unwatchFile']

for (const key in fs) {
  if (!{}.hasOwnProperty.call(fs, key)) {
    continue
  }
  const value = fs[key]
  if (typeof value === 'function' && !key.includes('Sync') && !key.includes('Steam') && !syncMethods.includes(key)) {
    promisifiedFS[key] = promisify(value)
  } else {
    promisifiedFS[key] = value
  }
}

promisifiedFS.exists = function(path: string) {
  return new Promise(function(resolve) {
    fs.access(path, fs.R_OK, function(error) {
      resolve(error === null)
    })
  })
}

promisifiedFS.readFile = function(path: string, encoding: ?string) {
  return new Promise(function(resolve, reject) {
    fs.readFile(path, function(error, buffer) {
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
