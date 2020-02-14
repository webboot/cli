import path from 'path'

import * as webboot from './tasks/index.mjs'

export const boot = async (state, commands) => {
  if (!path.isAbsolute(state.dir)) {
    state.dir = path.join(cwd, state.dir)
  }

  if (!path.isAbsolute(state.sri)) {
    state.sri = path.join(state.dir, state.sri)
  }

  if (commands.clean) {
    // delete the sri-hashes.json file
    await webboot.clean(state)
  }

  // import @webboot public key
  await webboot.prepare()

  // always generate newest state
  state.files = await webboot.generate(state)

  // write sriHashes to file, return the hashes as an object
  state.sriHashes = await webboot.write(state)

  // always verify sriHashes before continuing
  await webboot.verify(state)

  if (commands.sign || commands.release) {
    // sign the page using local gpg lib
    state.signed = await webboot.sign(state)

    if (commands.release) {
      // release signed hashes to the @webboot network.
      state.release = await webboot.release(state.signed)
    }
  }

  return state
}

export default boot
