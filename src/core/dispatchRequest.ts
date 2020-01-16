import { TxiosRequestConfig, TxiosPromise, TxiosResponse } from '../types/index'
import { handleUrl } from '../helpers/handleUrl'
import xhr from './xhr'
import { handleData } from '../helpers/handleData'
import { handleHeaders } from '../helpers/handleHeaders'
import { handleResData } from '../helpers/handleResData'

function dispatchRequest(config: TxiosRequestConfig): TxiosPromise {
  handleConfig(config)
  return xhr(config).then(res => {
    handleResponseData(res)
    return res
  })
}

function handleConfig(config: TxiosRequestConfig) {
  config.url = handleUrl(config.url, config.params)
  config.headers = handleHeaders(config.headers, config.data)
  config.data = handleData(config.data)
}

function handleResponseData(res: TxiosResponse) {
  res.data = handleResData(res.data)
}

export default dispatchRequest
