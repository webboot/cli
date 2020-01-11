import path from 'path'
import { fs, is } from '@magic/test'

import webboot from '../src/index.mjs'

const srcPath = path.join(process.cwd(), 'src', 'bin.mjs')

export default [
  { fn: fs.exists(srcPath), expect: true, info: 'src/bin.mjs exists' },
  { fn: () => webboot, expect: is.fn, info: 'src/index.mjs exports a function'}
]
