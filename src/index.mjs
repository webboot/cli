import path from 'path'

import log from '@magic/log'
import is from '@magic/types'

import webboot from '@webboot/core'

export const boot = async (state, commands) => {
  if (!path.isAbsolute(state.dir)) {
    state.dir = path.join(cwd, state.dir)
  }

  if (!path.isAbsolute(state.sri)) {
    state.sri = path.join(state.dir, state.sri)
  }

  if (commands.clean) {
    const deleted = await webboot.clean(state)
    if (is.error(deleted)) {
      return deleted
    }
  }

  // always generate newest state
  state.files = await webboot.generate(state)

  await webboot.write(state)

  // always verify
  await webboot.verify(state)

  if (commands.sign) {
    state = await webboot.sign(state)
    if (is.error(state)) {
      return state
    }
  }

  // if (commands.release) {
  //   state = await webboot.release(state)
  // }

  return state
}

export default boot
