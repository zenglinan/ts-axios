export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'delete'
  | 'DELETE'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export interface TxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

export interface TxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: TxiosRequestConfig
  request: any
}

export interface TxiosError {
  message: string
  config: TxiosRequestConfig
  status: number
  request?: any
  response?: TxiosResponse
}

export interface TxiosPromise extends Promise<TxiosResponse> {
}

export interface Txios {

  request(config: TxiosRequestConfig): TxiosPromise

  get(url: string, config?: TxiosRequestConfig): TxiosPromise

  delete(url: string, config?: TxiosRequestConfig): TxiosPromise

  head(url: string, config?: TxiosRequestConfig): TxiosPromise

  options(url: string, config?: TxiosRequestConfig): TxiosPromise

  post(url: string, data?: any, config?: TxiosRequestConfig): TxiosPromise

  put(url: string, data?: any, config?: TxiosRequestConfig): TxiosPromise

  patch(url: string, data?: any, config?: TxiosRequestConfig): TxiosPromise
}

export interface TxiosInstance extends Txios {
  (config: TxiosRequestConfig): TxiosPromise

  (url: string, config: TxiosRequestConfig): TxiosPromise
}