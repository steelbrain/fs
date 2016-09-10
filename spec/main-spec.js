/* @flow */

import { it } from 'jasmine-fix'
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
      await fs.access(__filename + '.bhrrr')
      expect(false).toBe(true)
    } catch (e) { /* No Op */ }
  })
})
