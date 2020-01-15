### 1. params 参数处理：
- 参数值为基本类型：直接拼接到 url 后面，要保留原本 url 的查询参数
```javascript
axios({
  method: '/base/get',
  url: 'get',
  params: {
    foo: 'a',
    bar: 'b'
  }
})

// => /base/get?foo=a&bar=b
```
- 参数值为对象：拼接的是 {"bar":"baz"}encode 后的结果。
```javascript
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})

// => /base/get?foo=%7B%22bar%22:%22baz%22%7D
```

- 参数值为数组：
```javascript
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['ele1', 'ele2']
  }
})
// => /base/get?foo[]='ele1'&foo[]='ele2'
```
- 参数值为日期对象：拼接 date.toISOString() 的结果
```javascript
const date = new Date()

axios({
  method: 'get',
  url: '/base/get',
  params: {
    date
  }
})

// => /base/get?date=2019-04-01T05:55:39.030Z
```

- 特殊字符保留：```@```、```:```、```$```、```,```、``` ```、```[```、```]```，不会被 encode，
其中空格会被转换成 ```+```
```javascript
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: '@:$, '
  }
})
```

- 空值忽略：忽略 ```undefiend```、```null```

- 丢弃 url 中的哈希 #


### 2. typescript 知识
- 字符串字面量
```typescript
type Method = 'get' | 'GET'
```
- 类型保护
类型保护实际上解决的是：在一个代码块中，进行一次类型推断之后，能够确定在这个代码块中这个变量的类型，
不用重复进行类型断言。

1. 类型谓词：自定义的类型保护函数
2. typeof：只能对基础类型进行类型保护
3. instanceof：对对象进行类型保护
```typescript
function isObject(val): val is Object {
  return Object.prototype.toString.call(val) 
          === '[object Object]'
}

// 使用了类型谓词后，在代码分支中就能清楚知道当前类型，不用进行多次类型断言
// for example:

if(isObject(a)) {
  // 如果 isObject 判断成功，if 作用域中，就明确知道 a 的类型是 Object
} else {
  // 同时明确知道，在另一个分支 a 的类型不是 Object，如果 a 是联合类型，可以是联合类型的其他类型。
}
```

- Promise<T>: Promise 泛型，resolve的参数会是 T 类型

### 3. 处理响应数据成 Promise 返回
定义响应数据的接口，txios 返回值类型为 Promise<TxiosResponse>泛型，resolve 的值的类型为 TxiosResponse 类型

对响应数据进行封装处理 resolve 出去，外部可以通过 then 获取到
```typescript
const response: TxiosResponse = {
  data: xhr.responseType && xhr.responseType === 'text' ? xhr.responseText : xhr.response,
  status: xhr.status,
  statusText: xhr.statusText,
  headers: xhr.getAllResponseHeaders(), // 获取所有响应头的方法
  config, // txios 请求的配置
  request: xhr  // xhr 对象
}
```