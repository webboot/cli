import path from 'path'

import cli from '@magic/cli'
import log from '@magic/log'

import crypto from '@webboot/crypto'
import { fingerprint } from '@webboot/keys'

export const prepare = async () => {
  const startTime = log.hrtime()

  log.success('welcome to @webboot\n')

  const keyExists = await crypto.gpg(`--list-keys ${fingerprint}`)
  if (keyExists.includes(fingerprint)) {
    return
  }

  log('importing the webboot public pgp key to your keyring.')

  const wantsToImport = await cli.prompt('import @webboot public key now? y/N: ', { yesNo: true })
  if (!wantsToImport) {
    log.error('E_KEY_IMPORT', "webboot must import it's public key to your pgp keyring to work")
    process.exit(1)
  }

  const webbootAsc = path.join(
    process.cwd(),
    'node_modules',
    '@webboot',
    'keys',
    'src',
    'webboot.asc.gpg',
  )

  try {
    const imported = await crypto.gpg(`--import ${webbootAsc}`)
    console.log({ imported })
  } catch (e) {
    console.log('ee', e)
  }

  log.timeTaken(startTime, '@webboot/sign took:')
}
