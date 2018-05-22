import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getTokenAndId, checkValidTokenAndUserId, removeToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 60000 // request timeout
})

service.interceptors.request.use(config => {
  
  if (checkValidTokenAndUserId()) {
  
    let tokenAndId = getTokenAndId()
  
    if (config.params && !config.params.isLogin) {
  
      config.params.userToken = tokenAndId.userToken

      config.params.loginUserId = tokenAndId.loginUserId
    }
  }
  
  console.log('请求', config)
  
  return config
  
}, error => {
  
  console.log(error)
  
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  
  response => {
    
    if (response.data.respCode === 'JSLIFEICOP0001') {
      
      return response.data.respData
    }
  
    removeToken()
    
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
