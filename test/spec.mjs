import { is } from '@magic/test'

import webboot from '../src/index.mjs'

export default [
  { fn: () => webboot, expect: is.fn, info: 'webboot is a function' },
]
