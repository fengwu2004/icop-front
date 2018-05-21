const currentuser = {
  state: {
    currentUser: {
      personId:null,
      name:null,
      personCode:' ',
      userName:null,
      telephone:null,
      sex:'MALE',
      password:null,
      roleIds:null,
      userId:null
    },
  },
  mutations: {
    SET_ROLEIDS: (state, roleIdsList) => {
      
      state.currentUser.roleIds = roleIdsList.join(',')
    },
    SET_USER: (state, user) => {
      
      console.log('ok')
      
      state.currentUser = user
    },
    CLEAR_USER: (state) => {
      
      state.currentUser = null
    },
    RESET_USER: (state) => {
      
      state.currentUser = {
        name:null,
        personCode:' ',
        userName:null,
        telephone:null,
        sex:'MALE',
        password:null,
        roleIds:null
      }
    },
  },
  actions: {
    setCurrentUser({ commit }, user) {
      
      return new Promise(resolve => {
  
        commit('SET_USER', user)
  
        resolve()
      })
    },
    setUserRoles({ commit }, roleIdsList) {
    
      return new Promise(resolve => {
      
        commit('SET_ROLEIDS', roleIdsList)
      
        resolve()
      })
    },
    clearUser({ commit, state }) {
      
      return new Promise((resolve) => {
        
        commit('CLEAR_USER')
        
        resolve()
      })
    },
    resetUser({ commit, state }) {
    
      return new Promise((resolve) => {
      
        commit('RESET_USER')
      
        resolve()
      })
    },
  }
}

export default currentuser
