import fs from '@magic/fs'
import log from '@magic/log'

const libName = '@webboot/write'

export const write = async state => {
  const startTime = log.hrtime()

  const hashes = state.files
    .map(({ algorithm, url, hash }) => `  "${url}": "${algorithm}-${hash}"`)
    .join(',\n')

  const hashString = `{\n${hashes}\n}`

  await fs.writeFile(state.sri, hashString)

  log.timeTaken(startTime, '@webboot/write took:')

  return JSON.parse(hashString)
}
