import { TxiosRequestConfig, TxiosPromise, TxiosResponse } from '../types'
import { handleResHeader } from '../helpers/handleResHeader'
import { createError } from '../helpers/createError'

export default function xhr(config: TxiosRequestConfig): TxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, method = 'GET', url, headers, responseType, timeout } = config
    let responseData: any
    const xhr = new XMLHttpRequest()
    xhr.open(method.toUpperCase(), url)

    if (responseType) {
      xhr.responseType = responseType
    }
    if (timeout) {
      xhr.timeout = timeout
    }
    // 设置请求头
    Object.keys(headers).map(name => {
      xhr.setRequestHeader(name, headers[name])
    })
    // 处理响应数据
    xhr.onreadystatechange = function() {
      if (xhr.status === 0) return // 当网络错误或超时时，status 为 0
      if (xhr.readyState === 4) {
        responseData =
          xhr.responseType && xhr.responseType === 'text' ? xhr.responseText : xhr.response
        const response: TxiosResponse = {
          data: responseData,
          status: xhr.status,
          statusText: xhr.statusText,
          headers: handleResHeader(xhr.getAllResponseHeaders()),
          config,
          request: xhr
        }
        handleResponse(response)
      }
    }

    // 网络错误
    xhr.onerror = () => {
      reject(
        createError({
          message: `Network Error`,
          config,
          status: xhr.status,
          request: xhr
        })
      )
    }
    // 超时错误
    xhr.ontimeout = () => {
      reject(
        createError({
          message: `Timeout Error, timeout in ${timeout} ms`,
          config,
          status: xhr.status,
          request: xhr
        })
      )
    }

    // 根据http状态码处理返回值
    function handleResponse(response: TxiosResponse) {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(response)
      } else {
        reject(
          createError({
            message: `Request failed with status code ${response.status}`,
            config,
            status: xhr.status,
            request: xhr,
            response: responseData || {}
          })
        )
      }
    }

    xhr.send(data)
  })
}
