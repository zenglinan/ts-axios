import {
  TxiosRequestConfig, TxiosPromise, Method,
  TxiosResponse, Interceptors, ResolveFn, RejectFn
} from '../types'
import dispatchRequest from './dispatchRequest'
import InterceptorOperator from './InterceptorOperator'

interface Chain {
  resolve: ResolveFn<any> | ((config: TxiosRequestConfig) => TxiosPromise)
  reject: RejectFn | undefined
}

export default class Txios {
  interceptors: Interceptors

  constructor() {
    this.interceptors = {
      request: new InterceptorOperator<TxiosRequestConfig>(),
      response: new InterceptorOperator<TxiosResponse>()
    }
  }

  request<T>(url: any, config?: any): TxiosPromise<T> {
    config = this.overload(url, config)  // 参数重载

    let chain: Chain[] = [{
      resolve: dispatchRequest,
      reject: undefined
    }]

    this.interceptors.request.interceptorCallbacks.forEach((callback) => {
      if (callback) {
        const { resolve, reject } = callback!
        chain.unshift({ resolve, reject })
      }
    })

    this.interceptors.response.interceptorCallbacks.forEach((callback) => {
      if (callback) {
        const { resolve, reject } = callback!
        chain.push({ resolve, reject })
      }
    })

    let promise = Promise.resolve(config)
    while (chain.length > 0) {
      const { resolve, reject } = chain.shift()!
      promise = promise.then(resolve, reject)
    }
    return promise
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

  private overload(url: string, config?: any) {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    return config
  }
}