import { isNullOrUndef, isPlainObject, isDate } from './util'

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function handleUrl(url: string, params: object): string {
  if (isNullOrUndef(params)) return url

  const keyValPart: string[] = [] // 键值对数组：['key1=val1', 'key2'='val2']
  Object.keys(params).map(key => {
    // @ts-ignore
    let value: any = params[key]
    let valueArr = []

    if (!value) return // 丢弃空值

    // 对 key 进行处理，除了 array 要给 key 加上 [] 后缀，其他无需处理
    // 同时将 value 统一处理为数组
    if (Array.isArray(value)) {
      key += '[]'
      valueArr = value
    } else {
      valueArr = [value]
    }

    // 对 valueArr 进行遍历，对每个元素进行处理，date、原生对象需要进行处理，其他只需和 key 进行拼接即可
    valueArr.forEach(val => {
      if (isNullOrUndef(val)) return

      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }

      keyValPart.push(`${encode(key)}=${encode(val)}`)
    })
  })

  // 将键值对片段拼接
  let serializedParams: string = keyValPart.join('&') // 'key1=val1&key2=val2'

  // 处理锚点
  const anchorIdx = serializedParams.indexOf('#')
  if (anchorIdx !== -1) {
    serializedParams = serializedParams.slice(0, anchorIdx)
  }

  // 拼接到 url
  url += url.indexOf('?') === -1 ? `?${serializedParams}` : `&${serializedParams}`
  return url
}
