type Method =
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
  url: string
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

export interface TxiosErr {
  message: string
  config: TxiosRequestConfig
  status: number
  request?: any
  response?: TxiosResponse
}

export interface TxiosPromise extends Promise<TxiosResponse> {}
