import https from 'https'
import URL from 'url'

import error from '@magic/error'
import is from '@magic/types'

import { errorMessages } from '../errorMessages.mjs'

const libName = '@webboot/cli.lib.httpGet'

export const errors = errorMessages(libName)

export const fetch = (url, options = {}) =>
  new Promise((resolve, reject) => {
    if (is.empty(url)) {
      reject(errors.HTTP_URL_EMPTY)
      return
    }

    const { body, json, ...opts } = options

    opts.headers['User-Agent'] = 'webboot'

    https
      .request(url, opts, res => {
        if (res.statusCode > 399) {
          reject(error(errors.HTTP_STATUSCODE(res)))
          return
        }

        // TODO: fix to get POST working
        // if (body) {
        // await res.write(body)
        // }

        let data = ''

        res.on('data', d => {
          data += d
        })

        res.on('end', () => {
          if (json) {
            data = JSON.parse(data)
          }

          resolve(data)
        })
      })
      .on('error', reject)
  })
