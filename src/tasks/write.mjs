import fs from '@magic/fs'
import log from '@magic/log'

const libName = '@webboot/write'

export const write = async state => {
  const startTime = log.hrtime()

  const hashes = state.files
    .map(({ algorithm, url, hash }) => `  "${url}": "${algorithm}-${hash}"`)
    .join(',\n')

  const hashString = `{\n${hashes}\n}`

  if (!state.dryRun) {
    await fs.writeFile(state.sri, hashString)
  }

  log.timeTaken(startTime, `${libName} took:`)

  return JSON.parse(hashString)
}
