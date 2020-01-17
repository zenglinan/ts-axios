import { TxiosRequestConfig, TxiosPromise, Method } from '../types'
import dispatchRequest from './dispatchRequest'

export default class Txios {
  request<T>(url: any, config?: any): TxiosPromise<T> {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    return dispatchRequest(config)
  }

  get<T>(url: string, config: TxiosRequestConfig): TxiosPromise<T> {
    return this.requestWithoutData<T>('get', url, config)
  }

  delete<T>(url: string, config: TxiosRequestConfig): TxiosPromise<T> {
    return this.requestWithoutData<T>('delete', url, config)
  }

  options<T>(url: string, config: TxiosRequestConfig): TxiosPromise<T> {
    return this.requestWithoutData<T>('options', url, config)
  }

  head<T>(url: string, config: TxiosRequestConfig): TxiosPromise<T> {
    return this.requestWithoutData<T>('head', url, config)
  }

  post<T>(url: string, config: TxiosRequestConfig, data?: any): TxiosPromise<T> {
    return this.requestWithData<T>('post', url, config, data)
  }

  put<T>(url: string, config: TxiosRequestConfig, data?: any): TxiosPromise<T> {
    return this.requestWithData<T>('put', url, config, data)
  }

  patch<T>(url: string, config: TxiosRequestConfig, data?: any): TxiosPromise<T> {
    return this.requestWithData<T>('patch', url, config, data)
  }

  requestWithoutData<T>(method: Method, url: string, config: TxiosRequestConfig) {
    return this.request(Object.assign(config || {}, {
      url,
      method
    })) as TxiosPromise<T>
  }

  requestWithData<T>(method: Method, url: string, config: TxiosRequestConfig, data?: any) {
    return this.request(Object.assign(config || {}, {
      url,
      method,
      data
    })) as TxiosPromise<T>
  }
}