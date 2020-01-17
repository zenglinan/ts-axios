import { TxiosInstance } from './types'
import { extend } from './helpers/util'
import Txios from './core/Txios'

function createInstance(): TxiosInstance {
  const context = new Txios()
  const instance = Txios.prototype.request.bind(context)

  extend(instance, context)
  return instance as TxiosInstance
}

const txios = createInstance()
export default txios