# FS

`sb-fs` is a Node.js module that exports a promisified FS.

## Installation

```
npm install --save sb-fs
```

## API

```js
export promisifyAll(*) from 'fs'
export function rimraf(path: string): Promise
export function mkdirp(path: string): Promise
```

## Usage

```js
import { readFile, rimraf, mkdirp } from 'sb-fs'

export default async function freedom() {
  await mkdirp('/path/to/democracy')
  await rimraf('/path/to/communism')
  console.log(await readFile(__filename))
}
```

## License

This package is licensed under the terms of MIT License. See the LICENSE file for more info.
