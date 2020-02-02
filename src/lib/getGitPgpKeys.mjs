import error from '@magic/error'
import is from '@magic/types'

import { httpGet } from './httpGet.mjs'
import * as json from './json.mjs'

import { errorMessages } from '../errorMessages.mjs'

const libName = '@webboot/cli.lib.getGitPgpKeys'

export const getGitPgpKeys = async ({ username, host = 'github' }) => {
  const apiPath = '/'

  if (host === 'github') {
    host = 'https://api.github.com/users/'
  } else if (host === 'gitlab') {
    host = 'https://gitlab.com/api/v4/users/'

    // we need the user id for gitlab
    const userData = await httpGet(`${host}?username=${username}`)
    username = userData.id
  } else {
    log.error('W_HOST_NOT_SUPPORTED', 'seems you input a custom git domain. support coming soon.')
    log('please open an issue to tell us about this.')
    process.exit(1)
  }

  try {
    const url = `${host}${username}/gpg_keys`
    const keys = await httpGet(url)
    return json.parse(keys)
  } catch (e) {
    console.log('name', e.name, 'code', e.code)

    throw e
  }
}
