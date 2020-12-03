import path from 'path'

import { fs, is, tryCatch } from '@magic/test'

// import { errorMessages } from '../../src/errorMessages.mjs'

import { clean } from '../../src/tasks/clean.mjs'

const testDir = path.join(process.cwd(), '.__test__clean__')

const sriFileName = 'sri-hashes.json'

const before = id => async () => {
  let dir = testDir + id

  await fs.mkdirp(dir)

  const sri = path.join(dir, sriFileName)
  await fs.writeFile(sri, 'ohai')

  return async () => {
    await fs.rmrf(dir)
  }
}

const tryDelete = async sri => {
  const existsBefore = await fs.exists(sri)

  const deleted = await clean({ sri })

  const existsAfter = await fs.exists(sri)

  return existsBefore && deleted && !existsAfter
}

const tryDryRun = async sri => {
  const existsBefore = await fs.exists(sri)

  const opts = {
    dryRun: true,
    sri,
  }

  const deleted = await clean(opts)

  const existsAfter = await fs.exists(sri)

  return existsBefore && !deleted && existsAfter
}

export default [
  {
    fn: async () => await tryDelete(path.join(testDir + 1, sriFileName)),
    before: before(1),
    expect: true,
    info: 'clean successfully deletes file with absolute path',
  },
  {
    fn: tryCatch(tryDelete, path.join(testDir + 2, sriFileName)),
    before: before(2),
    expect: true,
    info: 'clean errors on file with relative path',
  },
  {
    fn: async () => await tryDryRun(path.join(testDir + 2, sriFileName), { dryRun: true }),
    before: before(3),
    expect: true,
    info: 'clean does not delete if dryRun is true'
  }
]
