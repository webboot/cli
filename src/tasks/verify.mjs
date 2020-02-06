import error from '@magic/error'
import fs from '@magic/fs'
import log from '@magic/log'

import { errorMessages } from '../errorMessages.mjs'

import webboot from '@webboot/core'

const libName = '@webboot/verify'

export const errors = errorMessages(libName)

export const verify = async state => {
  const startTime = log.hrtime()

  // that file just got written, reading from filesystem to make sure the written content is valid
  const sriHashString = await fs.readFile(state.sri, 'utf8')
  const sriHashes = JSON.parse(sriHashString)

  // threeWayVerify reads the file from disk and from state, then verifies hashes.
  const mismatches = state.files.filter(webboot.threeWayVerifyFile(sriHashes)).map(f => f.file)

  if (mismatches.length) {
    const mismatchString = mismatches.join('\n')
    throw error(errors.HASH_MISMATCH(mismatchString))
  }

  log.timeTaken(startTime, `${libName} took:`)

  return state
}
