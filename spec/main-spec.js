import test from 'ava'
import path from 'path'
import vanilla from 'fs'
import fs from '..'

test('exports consts properly', function(t) {
  t.is(typeof fs.R_OK, 'number')
  t.is(typeof fs.W_OK, 'number')
})
test('exports functions properly', function(t) {
  t.is(typeof fs.open, 'function')
  t.is(typeof fs.readFile, 'function')
  t.is(typeof fs.writeFile, 'function')
})
test('exports functions that work', async function(t) {
  try {
    await fs.access(__filename)
  } catch (e) {
    t.fail()
  }
  try {
    await fs.access(path.join(__dirname, 'test.bhrrr'))
    t.fail()
  } catch (e) {
    /* No Op */
  }
  t.pass()
})
test('does not promisify sync functions', function(t) {
  t.is(fs.writeSync, vanilla.writeSync)
  t.not(fs.write, vanilla.write)
  t.is(fs.readSync, vanilla.readSync)
  t.not(fs.read, vanilla.read)
  t.is(fs.openSync, vanilla.openSync)
  t.not(fs.open, vanilla.open)
})
test('does not promisify non-callback functions', function(t) {
  t.is(fs.createReadStream, vanilla.createReadStream)
  t.is(fs.createWriteStream, vanilla.createWriteStream)
  t.is(fs.WriteStream, vanilla.WriteStream)
  t.is(fs.watch, vanilla.watch)
  t.is(fs.watchFile, vanilla.watchFile)
  t.is(fs.unwatchFile, vanilla.unwatchFile)
})
test('returns a BOM stripped string', async function(t) {
  const contents = await fs.readFile(__filename, 'utf8')
  t.not(contents.charCodeAt(0), 0xfeff)
})
