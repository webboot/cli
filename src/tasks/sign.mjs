import os from 'os'
import path from 'path'

import cli from '@magic/cli'
import error from '@magic/error'
import fs from '@magic/fs'
import is from '@magic/types'
import log from '@magic/log'

import crypto from '@webboot/crypto'
import webbootKeys from '@webboot/keys'

import { exec, getDomain, getEmail, getGitHost, getPgpKey, getVersion } from '../lib/index.mjs'

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

  const toSign = {
    hashes,
    domain,
    version,
    user: state.username,
    git,
  }

  const sig = await crypto.gpg.sign(fingerprint, webbootKeys.fingerprint, JSON.stringify(toSign))

  const key = await crypto.gpg.export(fingerprint)

  log.timeTaken(startTime, '@webboot/sign took:')

  return {
    sig,
    key,
    fingerprint,
  }
}
