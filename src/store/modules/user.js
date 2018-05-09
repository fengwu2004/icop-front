import { login, logout, editPwd } from '@/api/login'
import { getTokenAndId, setTokenAndId, removeToken } from '@/utils/auth'
import md5 from 'blueimp-md5'

let tokenAndId = getTokenAndId()

const user = {
  state: {
    userId: tokenAndId.loginUserId,
    userToken: tokenAndId.userToken,
    userName: '',
    telephone:'',
    pepodomIds:'',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
  },
  
  mutations: {
    SET_USER_ID: (state, userId) => {
      state.userId = userId
    },
    SET_USER_TOKEN: (state, token) => {
      state.userToken = token
    },
    SET_USER_NAME: (state, userName) => {
      state.userName = userName
    },
    SET_USER_TELEPHONE: (state, telephone) => {
      state.telephone = telephone
    },
    SET_USER_PEPODOMIDS: (state, pepodomIds) => {
      state.pepodomIds = pepodomIds
    },
  },
  
  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      
      console.log('登陆', userInfo)
      
      let passwordhash = md5(userInfo.password)
      
      const username = userInfo.userName.trim()
      
      return new Promise((resolve, reject) => {
        
        login(username, passwordhash, userInfo.Validate).then(response => {
          
          const data = response.data
          
          commit('SET_USER_TOKEN', data.userToken)
          
          commit('SET_USER_ID', data.userId)
          
          commit('SET_USER_NAME', data.userName)
          
          commit('SET_USER_TELEPHONE', data.telephone)
          
          commit('SET_USER_PEPODOMIDS', data.pepodomIds.split(','))
          
          setTokenAndId(response.data.token, response.data.userId)
          
          resolve()
          
        }).catch(error => {
          
          reject(error)
        })
      })
    },
    
    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        
        resolve(state.pepodomIds)
      })
    },
    
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            
            commit('SET_USER_TOKEN', '')
  
            commit('SET_USER_ID', '')
            
            commit('SET_USER_PEPODOMIDS', [])
            
            removeToken()
            
            resolve()
          })
          .catch(error => {
            
            reject(error)
          })
      })
    },
    
    // 前端 登出
    FedLogOut({ commit }) {
      
      return new Promise(resolve => {
        
        commit('SET_USER_TOKEN', '')
        
        commit('SET_USER_ID', '')
        
        removeToken()
        
        resolve()
      })
    },
    
    // 动态修改权限
    ChangeRoles({ commit }, role) {
      return new Promise(resolve => {
        resolve()
      })
    }
  }
}

export default user
