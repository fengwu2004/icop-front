import store from './store'

export function checkRouteAndActionEnable(code) {

  console.log('checkRouteAndActionEnable')
  
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