import store from './store'
import md5 from 'blueimp-md5'

export function checkRouteAndActionEnable(code) {

  if (!store.getters.permissioncodes) {
    
    return true
  }
  
  for (let i = 0; i < store.getters.permissioncodes.length; ++i) {
    
    if (code == store.getters.permissioncodes[i]) {
      
      return true
    }
  }
  
  return false
}

export const initpassword = md5('888888')
