import { asyncRouterMap, constantRouterMap } from '@/router'
import store from "@/store/index";

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param permissions
 * @param route
 */
function hasPermission(route, permissioncodes) {
  
  if (!route.meta || !route.meta.code) {
  
    return true
  }
  
  for (let i = 0; i < permissioncodes.length; ++i) {
    
    if (route.meta.code === permissioncodes[i]) {
      
      return true
    }
  }
  
  return false
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param permissions
 */
function filterAsyncRouter(asyncRouterMap, permissioncodes) {
  
  const accessedRouters = asyncRouterMap.filter(route => {
    
    if (hasPermission(route, permissioncodes)) {
      
      if (route.children && route.children.length) {
        
        route.children = filterAsyncRouter(route.children, permissioncodes)
        
        if (route.children.length > 0) {
  
          route.redirect = route.children[0].path
        }
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
    GenerateRoutes({ commit }, permissioncodes) {
      return new Promise(resolve => {
        
        let accessedRouters = filterAsyncRouter(asyncRouterMap, permissioncodes)
        
        if (accessedRouters.length > 0) {
  
          let route = { path: '', redirect:''}
  
          route.redirect = accessedRouters[0].path
  
          accessedRouters.push(route)
        }
  
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
