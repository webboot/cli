import cli from '@magic/cli'
import log from '@magic/log'

const libName = '@webboot/release'

export const release = async signed => {
  const startTime = log.hrtime()

  log.success('\n@webboot has collected all needed data.\n')

  await Promise.all(
    Object.entries(signed).map(async ([key, val]) => {
      if (key === 'hashes') {
        log.success(key, JSON.stringify(JSON.parse(val), null, 2))
        return
      }

      if (key === 'sig') {
        log.success('sig', 'signed and encrypted sri hashes')
        return
      }

      if (key === 'key') {
        log.success('key', 'your pgp public key')
        return
      }

      log.success(key, val.split('\n')[0])
    }),
  )

  log.warn('the data above will be sent to https://api.webboot.org')
  log(`@webboot will verify the hashes using ${signed.domain} and then publish this data.`)
  log('this can not be undone.')

  const wantsToSend = await cli.prompt('Do you want to publish this data?', { yesNo: true })

  if (wantsToSend) {
    const { sig, key, user, domain } = signed

    const data = JSON.stringify({
      sig,
      key,
      user,
      domain,
    })

    console.log({ data })
  }

  log.error('E_NOT_IMPLEMENTED', `${libName} not implemented yet.`)

  log.timeTaken(startTime, `${libName} took:`)
}
