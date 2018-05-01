import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress Configuration

// permissiom judge function
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login', '/authredirect']// no redirect whitelist

router.beforeEach((to, from, next) => {
  
  NProgress.start() // start progress bar
  
  if (getToken()) {
    
    if (to.path === '/login') {
      
      next({ path: '/' })
      
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    }
    else {
      // store.getters.pepodomIds
      let permissions = store.getters.permissions
      
      store.dispatch('GenerateRoutes', { permissions })
        .then(() => { // 根据roles权限生成可访问的路由表
    
        router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
    
        next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
      })
        .catch(res => {
        
          console.log(res)
        })
    }
  }
  else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      
      next()
    }
    else {
      
      next('/login') // 否则全部重定向到登录页
      
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  
  NProgress.done() // finish progress bar
})
