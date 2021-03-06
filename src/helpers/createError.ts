import { TxiosRequestConfig, TxiosResponse, TxiosError } from '../types'

export class TxiosErr extends Error {
  config: TxiosRequestConfig // 请求配置
  status?: number // 状态码
  request?: any // 请求 xhr 对象
  response?: TxiosResponse // 响应数据

  constructor(
    message: string,
    config: TxiosRequestConfig,
    status?: number,
    request?: any,
    response?: TxiosResponse
  ) {
    super(message)
    this.config = config
    this.status = status
    this.request = request
    this.response = response
  }
}

export function createError({ message, config, status, request, response }: TxiosError) {
  return new TxiosErr(message, config, status, request, response)
}
