import fs from '@magic/fs'

export const clean = state => {
  if (!state.dryRun) {
    fs.rmrf(state.sri)
  }
}
