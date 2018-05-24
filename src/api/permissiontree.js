import request from '@/utils/request'
import store from "@/store";

export function queryTotalPopedomTree() {
  
  if (!store.getters.appicopvalid) {
    
    return new Promise((resolve, reject) => {
  
      request({
        url: '/user/queryPopedomTree',
        method: 'post',
        params: {}
      }).then(res => {
      
        return store.dispatch('setAppAndIcopFunctions', res)
      }).then(res => {
        
        resolve({app:store.getters.appfunctions, icop:store.getters.icopfunctions})
      })
    })
  }
  
  return Promise.resolve({app:store.getters.appfunctions, icop:store.getters.icopfunctions})
}
