import path from 'path'

import * as webboot from './tasks/index.mjs'

const cwd = process.cwd()

export const boot = async (state, commands) => {
  if (!path.isAbsolute(state.dir)) {
    state.dir = path.join(cwd, state.dir)
  }

  if (!path.isAbsolute(state.sri)) {
    state.sri = path.join(state.dir, state.sri)
  }

  if (!state.username) {
    throw new Error('Username missing.')
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

  if (commands.sign || commands.release || commands.all) {
    // sign the page using local gpg lib
    state.signed = await webboot.sign(state)

    if (commands.release) {
      // release signed hashes to the @webboot network.
      state.release = await webboot.release(state.signed)
    } else if (commands.all) {
      console.log(`
webboot all task used, but not the release task.

please run webboot release to also publish your changes.
      `)
    }
  }

  return state
}

export default boot
