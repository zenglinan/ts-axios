import { TxiosRequestConfig } from './types'

export default function xhr(config: TxiosRequestConfig) {
  const { data = null, method = 'GET', url, headers = {} } = config

  const xhr = new XMLHttpRequest()
  xhr.open(method.toUpperCase(), url)

  Object.keys(headers).map(name => {
    xhr.setRequestHeader(name, headers[name])
  })

  xhr.send(data)
}
