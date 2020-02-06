import log from '@magic/log'

import crypto from '@webboot/crypto'
import webbootKeys from '@webboot/keys'

import { getDomain, getEmail, getGitHost, getPgpKey, getVersion } from '../lib/index.mjs'

const cwd = process.cwd()

const libName = '@webboot/sign'

export const sign = async state => {
  const startTime = log.hrtime()

  const email = await getEmail(state)

  const git = await getGitHost(state)

  const { key: fingerprint } = await getPgpKey(state)

  const domain = await getDomain(state)

  const hashes = JSON.stringify(state.sriHashes)

  const version = await getVersion(state)

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
