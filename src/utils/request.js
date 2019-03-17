import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
import { checkValidTokenAndUserId, removeToken } from '@/utils/auth'
import { systemerrorCode, errorcode, loginerrorCode } from "@/utils/errorCodes";

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 60000 // request timeout
})

service.interceptors.request.use(config => {
  
  console.log(config)
  
  return config
  
}, error => {
  
  console.log(error)
  
  return Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  
  response => {
  
    console.log(response)
    
    const { code ,data, msg} = response.data
    
    if (code == 0) {
      
      return Promise.resolve(data)
    }
    
    if (code == 201) {
      
      removeToken()
    }
    
    return Promise.reject(msg)
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
