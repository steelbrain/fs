# FS

`sb-fs` is a Node.js module that exports a promisified FS.

## Installation

```
npm install --save sb-fs
```

## API

```js
export promisifyAll(*) from 'fs'
export function rimraf(path: string): Promise<void>
export function mkdirp(path: string): Promise<void>
export function exists(path: string): Promise<boolean>
```

## Usage

```js
import { readFile, rimraf, mkdirp, exists } from 'sb-fs'

export default async function freedom() {
  await mkdirp('/path/to/democracy')
  await rimraf('/path/to/communism')
  console.log(await readFile(__filename))
  console.log(await exists('/path/to/humanity') ? 'it exists!!' : 'Naah it doesnt exist' )
}
```

## License

This package is licensed under the terms of MIT License. See the LICENSE file for more info.
