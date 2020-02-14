import cli from '@magic/cli'
import log from '@magic/log'

import webboot from '@webboot/core'

const libName = '@webboot/release'

export const release = async signed => {
  const startTime = log.hrtime()

  log.success('\n@webboot has collected all needed data.\n')

  log.warn('DATA WILL BE PUBLISHED', 'the following data will be sent to https://api.webboot.org')

  log.annotate('-------------------------------------------------------\n')

  // print the signed object
  Object.entries(signed.signed).map(([key, value]) => {
    log.warn(key, typeof value === 'string' ? value.substr(0, 30) : value)
  })

  log.annotate('-------------------------------------------------------\n')

  log(`@webboot will verify the hashes using ${signed.domain} and then publish this data.`)
  log.warn('this can not be undone.')

  const wantsToSend = await cli.prompt('Do you want to publish this data? (y/N) : ', { yesNo: true })

  if (wantsToSend) {
    const body = JSON.stringify(signed)

    const options = {
      body,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const response = await webboot.httpRequest('http://localhost:8080/v1/release/', options)

    console.log('api response:', response)
  }

  log.error('E_NOT_IMPLEMENTED', `${libName} not implemented yet.`)

  log.timeTaken(startTime, `${libName} took:`)
}
