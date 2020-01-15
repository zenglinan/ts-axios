export function handleResHeader(headers: string): object {
  let parsedHeaders: { [x: string]: string } = {}
  headers.split('\n').map(item => {
    if (!item) return
    let [key, value] = item.split(':')
    parsedHeaders[key] = value.trim()
  })
  return parsedHeaders
}
