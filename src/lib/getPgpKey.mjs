import is from '@magic/types'
import error from '@magic/error'
import log from '@magic/log'

import crypto from '@webboot/crypto'

import { errorMessages } from '../errorMessages.mjs'
import { prompt } from './prompt.mjs'
import { getGitPgpKeys } from './getGitPgpKeys.mjs'

const libName = '@webboot/cli.lib.getPgpKey'

export const errors = errorMessages(libName)

export const getPgpKey = async (state = {}) => {
  // get users keys from https://api.github.com/users/:username/gpg_keys
  const remoteGitPgpKeys = await getGitPgpKeys(state)

  if (is.error(remoteGitPgpKeys)) {
    throw remoteGitPgpKeys
  }

  let foundKeys = []
  await Promise.all(
    remoteGitPgpKeys.map(async ({ key_id }) => {
      const keys = await crypto.gpg(`--list-keys ${key_id}`, { parse: true })
      foundKeys = [...foundKeys, ...Object.values(keys)]
    }),
  )

  let key = 0

  if (foundKeys.length > 1) {
    log.warn('W_MORE_THAN_1_GPG_KEY', 'found more than 1 key.')
    log('please select the key you want to use:\n')

    foundKeys.forEach((key, i) => {
      const { name, email } = key.users[0]
      log.warn(i + 1, ` - ${key.key} - ${name} - ${email}`)
    })

    // TODO: prompt for 1-x here
    const keyId = await prompt({ msg: `Please enter a number between 1 and ${foundKeys.length}:` })
    key = keyId - 1
  }

  return foundKeys[key]
}