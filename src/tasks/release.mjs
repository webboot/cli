import cli from '@magic/cli'
import log from '@magic/log'

import webboot from '@webboot/core'

const libName = '@webboot/release'

export const release = async state => {
  const { signed, apiUrl } = state
  const startTime = log.hrtime()

  log.success('\n@webboot has collected all needed data.\n')

  log.warn('DATA WILL BE PUBLISHED', 'and sent to https://api.webboot.org')

  log.annotate('\n-------------------------------------------------------')

  // print the signed object
  Object.entries(signed.signed).map(([key, value]) => {
    log.warn(key, typeof value === 'string' ? value.substr(0, 30) : value)
  })

  log.annotate('-------------------------------------------------------\n')

  log(`@webboot will verify the hashes using ${signed.domain} and then publish this data.`)
  log.warn('this can not be undone.')

  const releasePrompt = 'Do you want to publish this data? (y/N) : '
  const wantsToSend = await cli.prompt(releasePrompt, { yesNo: true })

  if (wantsToSend) {
    log.error('E_NOT_IMPLEMENTED', `${libName} not implemented yet.`)

    const body = JSON.stringify(signed)

    const options = {
      body,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }

    if (!state.dryRun) {
      const response = await webboot.httpRequest(`${apiUrl}/api/v1/release`, options)
      log('api response:', response)
    }
  }

  log.timeTaken(startTime, `${libName} took:`)
}
