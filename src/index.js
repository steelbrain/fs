/* @flow */

import FS from 'fs'
import rimraf from 'rimraf'
import mkdirp from 'mkdirp'
import promisify from 'sb-promisify'

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

promisifiedFS.rimraf = promisify(rimraf)
promisifiedFS.mkdirp = promisify(mkdirp)
promisifiedFS.exists = function(path: string) {
  return new Promise(function(resolve) {
    FS.access(path, FS.R_OK, function(error) {
      resolve(error === null)
    })
  })
}
promisifiedFS.readFile = function(path: string) {
  return new Promise(function(resolve, reject) {
    FS.readFile(path, 'utf8', function(error, contents) {
      if (error) {
        reject(error)
      } else if (contents.charCodeAt(0) === 0xFEFF) {
        resolve(contents.slice(1))
      } else resolve(contents)
    })
  })
}

module.exports = promisifiedFS
