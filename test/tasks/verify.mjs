import path from 'path'

import crypto from '@webboot/crypto'

import { fs, is, tryCatch } from '@magic/test'

import { verify, errors } from '../../src/tasks/verify.mjs'

const fixturePath = path.join(process.cwd(), 'test', 'tasks', '.fixtures')

const sriHashPath = path.join(fixturePath, 'sri-hashes.json')
const sriBrokenPath = path.join(fixturePath, 'sri-broken.json')
const sriInvalidPath = path.join(fixturePath, 'sri-invalid-hash.json')

const cwd = process.cwd()

const localSriHashPath = sriHashPath.replace(cwd, '')

const relativePathOptions = {
  dir: path.join('test', 'tasks', '.fixtures'),
  sri: path.join('test', 'tasks', '.fixtures', 'sri-hashes.json'),
  cwd: process.cwd(),
}

export default [{ fn: tryCatch(verify), expect: is.error, info: 'errors without a state' }]
