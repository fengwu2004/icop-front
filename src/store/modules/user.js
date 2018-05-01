import { login, logout, editPwd } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    userId: '',
    userToken: getToken(),
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
      console.log(userInfo)
      const username = userInfo.userName.trim()
      
      return new Promise((resolve, reject) => {
        login(username, userInfo.password, userInfo.Validate).then(response => {
          
          const data = response.data
          
          commit('SET_USER_TOKEN', data.userToken)
          
          commit('SET_USER_ID', data.userId)
          
          commit('SET_USER_NAME', data.userName)
          
          commit('SET_USER_TELEPHONE', data.telephone)
          
          commit('SET_USER_PEPODOMIDS', data.pepodomIds.split(','))
          
          setToken(response.data.token)
          
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
