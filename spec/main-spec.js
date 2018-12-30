/* @flow */

import Path from 'path'
import { it } from 'jasmine-fix'
import vanilla from 'fs'
import fs from '../'

describe('sb-fs', function() {
  it('exports consts properly', function() {
    expect(typeof fs.R_OK).toBe('number')
    expect(typeof fs.W_OK).toBe('number')
  })
  it('exports functions properly', function() {
    expect(typeof fs.open).toBe('function')
    expect(typeof fs.readFile).toBe('function')
    expect(typeof fs.writeFile).toBe('function')
  })
  it('exports functions that work', async function() {
    try {
      await fs.access(__filename)
    } catch (e) {
      expect(false).toBe(true)
    }
    try {
      await fs.access(Path.join(__dirname, 'test.bhrrr'))
      expect(false).toBe(true)
    } catch (e) {
      /* No Op */
    }
  })
  it('does not promisify sync functions', function() {
    expect(fs.writeSync).toBe(vanilla.writeSync)
    expect(fs.write).not.toBe(vanilla.write)
    expect(fs.readSync).toBe(vanilla.readSync)
    expect(fs.read).not.toBe(vanilla.read)
    expect(fs.openSync).toBe(vanilla.openSync)
    expect(fs.open).not.toBe(vanilla.open)
  })
  it('does not promisify non-callback functions', function() {
    expect(fs.createReadStream).toBe(vanilla.createReadStream)
    expect(fs.createWriteStream).toBe(vanilla.createWriteStream)
    expect(fs.WriteStream).toBe(vanilla.WriteStream)
    expect(fs.watch).toBe(vanilla.watch)
    expect(fs.watchFile).toBe(vanilla.watchFile)
    expect(fs.unwatchFile).toBe(vanilla.unwatchFile)
  })
  it('returns a BOM stripped string', async function() {
    const contents = await fs.readFile(__filename, 'utf8')
    expect(contents.charCodeAt(0)).not.toBe(0xfeff)
  })
})
