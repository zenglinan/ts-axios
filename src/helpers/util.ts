function toString(val: any): string {
  return Object.prototype.toString.call(val)
}

export function isPlainObject(val: any): val is Object {
  return toString(val) === '[object Object]'
}

export function isNullOrUndef(val: any): boolean {
  return val === null || val === undefined
}

export function isDate(val: any): val is Date {
  return toString(val) === '[object Date]'
}

export function extend<T, U>(to: T, from: U): T & U {
  for (let key in from) {
    (to as T & U)[key] = (from as T & U)[key]
  }
  return to as T & U
}
