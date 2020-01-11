#!/usr/bin/env node

import path from 'path'

import cli from '@magic/cli'
import log from '@magic/log'
import is from '@magic/types'

import boot from './index.mjs'

const cliArgs = {
  options: [
    ['--help', '-help', 'help', '--h', '-h'],
    ['--dir', '--in', '-d'],
    ['--sri', '--sriHashFile', '--sri-hash-file'],
    ['--no-write', '--noWrite'],
  ],
  commands: ['verify', ['generate', 'gen'], 'sign', 'clean'],
  single: ['--dir', 'sri'],
  default: {
    '--dir': path.join(process.cwd(), 'docs'),
    '--sri': 'sri-hashes.json',
  },
  help: {
    name: 'magic-glyphs',
    header: 'generate webfont files from a directory of svgs.',
    options: {
      '--dir': 'working directory for webboot.',
      '--sri': 'the name of the sri-hashes.json file generated. relative to --dir',
      '--no-write': 'do not write sri-hashes.json file',
    },
    commands: {
      verify: 'verify the sri-hashes.json in --dir is correct',
      generate: 'generate sri-hashes.json in -- dir',
      sign: 'sign the sri-hashes.json',
      publish: 'publish the current version of sri-hashes for server verification',
      clean: 'delete sri-hashes.json file',
    },
    example: `
# generate sri-hash.json for the docs directory
webboot generate --dir docs

# verify the docs directory
webboot verify --dir docs

# sign the docs directory sri-hashes.json file
# TO BE DONE
webboot sign

# verifies, then releases the hashes to the webboot validator servers.
# TO BE DONE
webboot release

# delete webboot generated sri-hashes.json file
webboot clean
`,
  },
}

const run = async () => {
  const { args, commands } = cli(cliArgs)

  const booted = await boot(args, commands)

  if (is.error(booted)) {
    log.error(booted.code, booted.message)
    process.exit()
  }

  log.success('webboot done')
}

run()
