import { TxiosRequestConfig } from './types/index'
import { handleUrl } from './helpers/handleUrl'
import xhr from './xhr'
import { handleData } from './helpers/handleData'
import { handleHeaders } from './helpers/handleHeaders'

function txios(config: TxiosRequestConfig) {
  handleConfig(config)
  xhr(config)
}

function handleConfig(config: TxiosRequestConfig) {
  config.url = handleUrl(config.url, config.params)
  config.headers = handleHeaders(config.headers, config.data)
  config.data = handleData(config.data)
}

export default txios
