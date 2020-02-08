import cli from '@magic/cli'
import log from '@magic/log'

import webboot from '@webboot/core'

const libName = '@webboot/release'

export const release = async signed => {
  const startTime = log.hrtime()

  log.success('\n@webboot has collected all needed data.\n')

  // await Promise.all(
  // Object.entries(signed).map(async ([key, val]) => {
  // if (key === 'hashes') {
  // log.success(key, JSON.stringify(JSON.parse(val), null, 2))
  // return
  // }

  // if (key === 'sig') {
  // log.success('sig', 'signed and encrypted sri hashes')
  // return
  // }

  // if (key === 'key') {
  // log.success('key', 'your pgp public key')
  // return
  // }

  // log.success(key, val.split('\n')[0])
  // }),
  // )

  log('the data above will be sent to https://api.webboot.org')
  log(`@webboot will verify the hashes using ${signed.domain} and then publish this data.`)
  log.warn('this can not be undone.')

  const wantsToSend = await cli.prompt('Do you want to publish this data?', { yesNo: true })

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

    console.log({ response })
  }

  log.error('E_NOT_IMPLEMENTED', `${libName} not implemented yet.`)

  log.timeTaken(startTime, `${libName} took:`)
}
