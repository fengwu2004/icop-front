import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param permissions
 * @param route
 */
function hasPermission(permissionsRoutes, route) {
  
  return true
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param permissions
 */
function filterAsyncRouter(asyncRouterMap, permissionsRoutes) {
  
  const accessedRouters = asyncRouterMap.filter(route => {
    
    if (hasPermission(permissionsRoutes, route)) {
      
      if (route.children && route.children.length) {
        
        route.children = filterAsyncRouter(route.children, permissionsRoutes)
      }
      
      return true
    }
    
    return false
  })
  
  return accessedRouters
}

export const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    validCodes:[]
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    SET_PERMISSION_CODES: (state, codesstr) => {
      
      state.validCodes = codesstr.split(',')
    }
  },
  actions: {
    GenerateRoutes({ commit }, routes) {
      return new Promise(resolve => {
        
        console.log('zzz')
        
        let accessedRouters = filterAsyncRouter(asyncRouterMap, routes)
        
        commit('SET_ROUTERS', accessedRouters)
        
        resolve()
      })
    },
    setPemissionCodes({commit}, codesstr) {
      
      return new Promise(resolve => {
  
        commit('SET_PERMISSION_CODES', codesstr)
        
        resolve()
      })
    }
  }
}
