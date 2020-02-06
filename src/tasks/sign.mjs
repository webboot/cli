import log from '@magic/log'

import crypto from '@webboot/crypto'
import webbootKeys from '@webboot/keys'

import webboot from '@webboot/core'

const cwd = process.cwd()

const libName = '@webboot/sign'

export const sign = async state => {
  const startTime = log.hrtime()

  const email = await webboot.getEmail(state)

  const git = await webboot.getGitHost(state)

  const { key: fingerprint } = await webboot.getPgpKey(state)

  const domain = await webboot.getDomain(state)

  const hashes = JSON.stringify(state.sriHashes)

  const version = await webboot.getVersion(state)

  const key = await crypto.gpg.export(fingerprint)

  const toSign = {
    domain,
    fingerprint,
    hashes,
    git,
    key,
    user: state.username,
    version,
  }

  const sig = await crypto.gpg.sign(fingerprint, webbootKeys.fingerprint, JSON.stringify(toSign))

  log.timeTaken(startTime, '@webboot/sign took:')

  return {
    sig,
    signed: toSign,
  }
}
