#!/usr/bin/env node

import path from 'path'

import cli from '@magic/cli'
import log from '@magic/log'
import is from '@magic/types'

import boot from './index.mjs'

const cliArgs = {
  name: 'webboot',
  options: [
    ['--help', '-help', 'help', '--h', '-h'],
    ['--dir', '--in', '-d'],
    ['--sri', '--sriHashFile', '--sri-hash-file'],
    ['--no-write', '--noWrite'],
    ['--username', '--user', '--user-name', '--name', '-u', '-n'],
    ['--secrets-file', '--secret-file', '--pass-file'],
    ['--homepage', '--url', '--domain'],
  ],
  commands: ['verify', ['generate', 'gen'], 'sign', 'clean', 'release', 'all'],
  single: ['--dir', '--sri', '--pass', '--key', '--username'],
  default: {
    '--dir': path.join(process.cwd(), 'docs'),
    '--sri': 'sri-hashes.json',
  },
  help: {
    name: 'webboot',
    header: 'generate, verify, sign and release subresource integrity hashes for your static page.',
    options: {
      '--dir': 'working directory for webboot.',
      '--sri': 'the name of the sri-hashes.json file generated. relative to --dir',
      '--no-write': 'do not write sri-hashes.json file',
      '--key': 'sign and release: pub-key file. absolute path.',
      '--passphrase': 'sign and release: passphrase to use locally. NOT THE GIT PASSWORD!',
      '--user': 'sign and release: the name to publish as.',
    },
    commands: {
      verify: 'verify the sri-hashes.json in --dir is correct',
      generate: 'generate sri-hashes.json in --dir',
      sign: 'sign the sri-hashes.json using your public ssh key and a passphrase.',
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

  try {
    const booted = await boot(args, commands)
    if (is.error(booted)) {
      throw booted
    }
  } catch (e) {
    log.error(e)
    process.exit(1)
  }

  log.success('webboot done')
}

run()
