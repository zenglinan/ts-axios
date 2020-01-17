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

export interface TxiosResponse<T = any> {
  data: T
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

export interface TxiosPromise<T = any> extends Promise<TxiosResponse<T>> {
}

export interface Txios {
  interceptors: Interceptors

  request<T>(config: TxiosRequestConfig): TxiosPromise<T>

  get<T>(url: string, config?: TxiosRequestConfig): TxiosPromise<T>

  delete<T>(url: string, config?: TxiosRequestConfig): TxiosPromise<T>

  head<T>(url: string, config?: TxiosRequestConfig): TxiosPromise<T>

  options<T>(url: string, config?: TxiosRequestConfig): TxiosPromise<T>

  post<T>(url: string, data?: any, config?: TxiosRequestConfig): TxiosPromise<T>

  put<T>(url: string, data?: any, config?: TxiosRequestConfig): TxiosPromise<T>

  patch<T>(url: string, data?: any, config?: TxiosRequestConfig): TxiosPromise<T>
}

export interface TxiosInstance extends Txios {
  <T = any>(url: string, config?: TxiosRequestConfig): TxiosPromise<T>

  <T = any>(config: TxiosRequestConfig): TxiosPromise<T>
}

/* interceptor */

// txios instance's interceptors object
export interface Interceptors {
  request: TxiosInterceptorOperator<TxiosRequestConfig>
  response: TxiosInterceptorOperator<TxiosResponse>
}

// use's param resolve
export interface ResolveFn<T> {
  (config: T): T | Promise<T>
}

// use's param reject
export interface RejectFn {
  (error: any): any
}

// txios.interceptors.request & txios.interceptors.response
export interface TxiosInterceptorOperator<T> {
  interceptorCallbacks: Array<InterceptorCallback<T> | null>

  use(resolve: ResolveFn<T>, reject?: RejectFn): number

  eject(id: number): void
}

// interceptor callback saved in interceptorOperator
export interface InterceptorCallback<T> {
  resolve: ResolveFn<T>
  reject?: RejectFn
}