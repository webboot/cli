import fs from '@magic/fs'

export const clean = state => fs.rmrf(state.sri)
