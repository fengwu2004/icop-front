import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
import { getTokenAndId, checkValidTokenAndUserId, removeToken } from '@/utils/auth'
import { systemerrorCode, errorcode } from "@/utils/errorCodes";

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
    
    const respCode = response.data.respCode
    
    if (respCode === 'JSLIFEICOP0001') {
      
      return Promise.resolve(response.data.respData)
    }
    
    if (respCode in systemerrorCode) {
    
      let msg = systemerrorCode[respCode]
  
      Message({
    
        message: msg,
        type: 'error',
        duration: 5 * 1000
      })
  
      router.push({path:'/login'})
  
      removeToken()
  
      return Promise.reject(null)
    }
    
    if (respCode in errorcode) {
  
      let msg = errorcode[respCode]
  
      Message({
  
        message: msg,
        type: 'error',
        duration: 5 * 1000
      })
      
      return Promise.reject(null)
    }
    
    return Promise.reject('未知错误')
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
