import { TxiosRequestConfig, TxiosPromise, TxiosResponse } from './types'

export default function xhr(config: TxiosRequestConfig): TxiosPromise {

  return new Promise((resolve) => {
    const { data = null, method = 'GET', url, headers, responseType } = config
    const xhr = new XMLHttpRequest()
    xhr.open(method.toUpperCase(), url)

    if (responseType) {
      xhr.responseType = responseType
    }
    // 设置请求头
    Object.keys(headers).map(name => {
      xhr.setRequestHeader(name, headers[name])
    })
    // 处理响应数据
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        const response: TxiosResponse = {
          data: xhr.responseType && xhr.responseType === 'text' ? xhr.responseText : xhr.response,
          status: xhr.status,
          statusText: xhr.statusText,
          headers: xhr.getAllResponseHeaders(),
          config,
          request: xhr
        }
        resolve(response)
      }
    }

    xhr.send(data)
  })
}
