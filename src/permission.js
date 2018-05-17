import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { queryPopedomList } from "@/api/login";
import { checkValidTokenAndUserId } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress Configuration

// permissiom judge function
function hasPermission(roles, permissionRoles) {
  
  return true
}

function getFirstValidRoute(routes) {
  
  if (!routes || routes.length == 0) {
    
    return ''
  }
  
  let path = routes[0].path + '/' + getFirstValidRoute(routes[0].children)
  
  return path
}

const whiteList = ['/login', '/authredirect']// no redirect whitelist

function dynamicCreateRoutes(to, from, next) {
  
  let routes = store.getters.routes
  
  queryPopedomList({}).
    then(res => {
    
      return store.dispatch('setPemissionCodes', res.data.respData)
    })
    .then(res => {
      
      return store.dispatch('GenerateRoutes', store.getters.permissioncodes)
    })
    .then(res => {
  
      router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
  
      let replace = { ...to, replace: true}
  
      next(replace)
    })
    .catch(res => {
    
      console.log(res)
    })
}

router.beforeEach((to, from, next) => {
  
  console.log(from.path, to.path)
  
  NProgress.start() // start progress bar
  
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
