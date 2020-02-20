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

  const host = await webboot.getDomain(state)

  const version = await webboot.getVersion(state)

  const key = await crypto.gpg.export(fingerprint)

  const toSign = {
    host,
    fingerprint,
    hashes: state.sriHashes,
    version,
  }

  const sig = await crypto.gpg.sign(fingerprint, webbootKeys.fingerprint, JSON.stringify(toSign))


  const meta = {
    key,
    git,
    user: state.username,
  }

  const metaSig = await crypto.gpg.sign(fingerprint, webbootKeys.fingerprint, JSON.stringify(meta))

  log.timeTaken(startTime, '@webboot/sign took:')

  return {
    sig,
    signed: toSign,
    meta,
    metaSig,
  }
}
