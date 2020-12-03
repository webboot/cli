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
    ['--sri', '--sri-hash-file'],
    ['--username', '--user', '--user-name', '--name', '-u', '-n'],
    ['--secrets-file', '--secret-file', '--pass-file'],
    ['--homepage', '--url', '--domain'],
    ['--dry-run', '--dry'],
    ['--api-url'],
  ],
  commands: ['verify', ['generate', 'gen'], 'sign', 'clean', 'release', 'all'],
  single: ['--dir', '--sri', '--pass', '--key', '--username', '--dry-run', '--api-url'],
  default: {
    '--dir': path.join(process.cwd(), 'docs'),
    '--sri': 'sri-hashes.json',
    // '--dry-run': false,
    '--api-url': 'https://api.webboot.org',
  },
  help: {
    name: 'webboot',
    header: 'generate, verify, sign and release subresource integrity hashes for your static page.',
    options: {
      '--dir': 'working directory for webboot.',
      '--sri': 'the name of the sri-hashes.json file generated. relative to --dir',
      '--key': 'sign and release: pub-key file. absolute path.',
      '--passphrase': 'sign and release: passphrase to use locally. NOT THE GIT PASSWORD!',
      '--user': 'sign and release: the name to publish as.',
      '--dry-run': 'do not actually change anything.',
      '--api-url': 'host to use for api requests',
    },
    commands: {
      verify: 'verify the sri-hashes.json in --dir is correct',
      generate: 'generate sri-hashes.json in --dir',
      sign: 'sign the sri-hashes.json using your public ssh key and a passphrase.',
      publish: 'publish the current version of sri-hashes for server verification',
      clean: 'delete sri-hashes.json file',
      release: 'WIP: release the hashes to webboot.org.'
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

  args.dryRun = args.hasOwnProperty('dryRun')

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
