import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getTokenAndId, checkValidTokenAndUserId } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // request timeout
})

service.interceptors.request.use(config => {
  
  if (checkValidTokenAndUserId()) {
  
    let tokenAndId = getTokenAndId()
  
    if (config.params) {
  
      config.params.userToken = tokenAndId.userToken

      config.params.loginUserId = tokenAndId.loginUserId
    }
  }
  
  console.log(config)
  
  console.log(config.params)
  
  return config
  
}, error => {
  
  console.log(error)
  
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  
  response => {
  
    const res = response.data
    
    if (res.success === 'true') {
  
      return response.data.respData
    }
  
    Message({
      message: res.message,
      type: 'error',
      duration: 5 * 1000
    });
  
    if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      
      MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload();// 为了重新实例化vue-router对象 避免bug
        });
      })
    }
    return Promise.reject('error');
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  })

export default service
