import { isPlainObject } from './util'

export function handleData(data: any = {}): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}
