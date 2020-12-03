import fs from '@magic/fs'

export const clean = async state => {
  if (!state.dryRun) {
    const result = await fs.rmrf(state.sri)
    return result
  }
}
