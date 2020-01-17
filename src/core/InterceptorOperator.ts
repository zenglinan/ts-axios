import { RejectFn, ResolveFn, InterceptorCallback} from '../types'

export default class InterceptorOperator<T> {
  interceptorCallbacks: Array<InterceptorCallback<T> | null>

  constructor() {
    this.interceptorCallbacks = []
  }

  use(resolve: ResolveFn<T>, reject?: RejectFn): number {
    this.interceptorCallbacks.push({
      resolve,
      reject
    })
    return this.interceptorCallbacks.length - 1
  }

  eject(id: number): void {
    this.interceptorCallbacks[id] = null
  }
}