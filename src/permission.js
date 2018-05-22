import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { queryPopedomList } from "@/api/login";
import {checkValidTokenAndUserId, removeToken} from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/authredirect']

function dynamicCreateRoutes(to, from, next) {
  
  let routes = store.getters.routes
  
  queryPopedomList({}).
    then(respData => {
    
      return store.dispatch('setPemissionCodes', respData)
    })
    .then(res => {
      
      return store.dispatch('GenerateRoutes', store.getters.permissioncodes)
    })
    .then(res => {
  
      router.addRoutes(store.getters.addRouters)
  
      let replace = { ...to, replace: true}
  
      next(replace)
    })
    .catch(res => {
    
      next('/login')
  
      removeToken()
    })
}

router.beforeEach((to, from, next) => {
  
  console.log(from.path, to.path)
  
  NProgress.start()
  
  if (!checkValidTokenAndUserId()) {
  
    if (whiteList.indexOf(to.path) !== -1) {
    
      next()
    }
    else {
  
      next('/login')
  
      NProgress.done()
    }
    
    return
  }
  
  if (to.path === '/login') {
    
    next({ path: '/' })
    
    NProgress.done()
    
    return
  }
  
  if (store.getters.addRouters.length == 0) {
    
    dynamicCreateRoutes(to, from, next)
  }
  else {
  
    next()
  }
})

router.afterEach(() => {
  
  NProgress.done() // finish progress bar
})
