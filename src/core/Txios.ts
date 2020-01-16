import { TxiosRequestConfig, TxiosPromise, Method } from '../types'
import dispatchRequest from './dispatchRequest'

export default class Txios {
  request(url: any, config?: any): TxiosPromise {
    if(typeof url === 'string') {
      if(!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    return dispatchRequest(config)
  }

  get(url: string, config: TxiosRequestConfig): TxiosPromise {
    return this.requestWithoutData('get', url, config)
  }

  delete(url: string, config: TxiosRequestConfig): TxiosPromise {
    return this.requestWithoutData('delete', url, config)
  }

  options(url: string, config: TxiosRequestConfig): TxiosPromise {
    return this.requestWithoutData('options', url, config)
  }

  head(url: string, config: TxiosRequestConfig): TxiosPromise {
    return this.requestWithoutData('head', url, config)
  }

  post(url: string, config: TxiosRequestConfig, data?: any): TxiosPromise {
    return this.requestWithData('post', url, config, data)
  }

  put(url: string, config: TxiosRequestConfig, data?: any): TxiosPromise {
    return this.requestWithData('put', url, config, data)
  }

  patch(url: string, config: TxiosRequestConfig, data?: any): TxiosPromise {
    return this.requestWithData('patch', url, config, data)
  }

  requestWithoutData(method: Method, url: string, config: TxiosRequestConfig): TxiosPromise {
    return this.request(Object.assign(config || {}, {
      url,
      method
    }))
  }

  requestWithData(method: Method, url: string, config: TxiosRequestConfig, data?: any): TxiosPromise {
    return this.request(Object.assign(config || {}, {
      url,
      method,
      data
    }))
  }
}