import axios from '../../src/index'

axios({
  method: 'get',
  url: '/error/get1'
}).then((res) => {
  console.log(res)
}).catch((e) => {
  console.log(e)
})

axios({
  method: 'get',
  url: '/error/get'
}).then((res) => {
  console.log(res)
}).catch((e) => {
  console.log(e)
})

setTimeout(() => {
  axios({
    method: 'get',
    url: '/error/get'
  }).catch(res => {
    console.log(res)
    console.log(res.config)
  })
}, 5000)

axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 10
}).then((res) => {
  console.log(res)
}).catch((e) => {
  console.log(e)
})