import { asyncRouterMap, constantRouterMap } from '@/router'
import store from "@/store/index";

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param permissions
 * @param route
 */
function hasPermission(route) {
  
  return true
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param permissions
 */
function filterAsyncRouter(asyncRouterMap) {
  
  const accessedRouters = asyncRouterMap.filter(route => {
    
    if (hasPermission(route)) {
      
      if (route.children && route.children.length) {
        
        route.children = filterAsyncRouter(route.children)
        
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
    addRouters:[],
    validCodes:[],
    appfunctions:null,
    icopfunctions:null,
    appicopvalid:false,
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    SET_PERMISSION_CODES: (state, codesstr) => {
      
      state.validCodes = codesstr.split(',')
    },
    SET_APP_ICOP_FUNCTIONS: (state, appandicop) => {
  
      if (appandicop.app) state.appfunctions = Array.from(appandicop.app)
      
      if (appandicop.icop) state.icopfunctions = Array.from(appandicop.icop)
      
      state.appicopvalid = true
    },
    RESET_PERMISSION: (state) => {
    
      state.routers = constantRouterMap
  
      state.addRouters = []
      
      state.validCodes = []
      
      state.appfunctions = null
      
      state.icopfunctions = null
      
      state.appicopvalid = false
    }
  },
  actions: {
    GenerateRoutes({ commit }) {
      return new Promise(resolve => {
        
        let accessedRouters = filterAsyncRouter(asyncRouterMap)
        
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
    },
    setAppAndIcopFunctions({commit}, appandicop) {
  
      return new Promise(resolve => {
    
        commit('SET_APP_ICOP_FUNCTIONS', appandicop)
    
        resolve()
      })
    },
    resetPermissions({commit}) {
  
      return new Promise(resolve => {
    
        commit('RESET_PERMISSION')
    
        resolve()
      })
    }
  }
}
