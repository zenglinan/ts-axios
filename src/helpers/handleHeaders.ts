import { isPlainObject } from './util'

// 规范 header 大小写
function normalizeHeaders(headers: any, normalizedName: string) {
  if (!headers) return
  Object.keys(headers).map(name => {
    if (name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export function handleHeaders(headers: any = {}, data: any = {}): any {
  normalizeHeaders(headers, 'Content-Type')

  if (isPlainObject(data) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json;charset=utf-8'
  }
  return headers
}
