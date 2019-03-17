const currentuser = {
  state: {
    currentUser: {
      identityNum:null,
      phoneValidated:null,
      createTime:null,
      phone:null,
      qiyeshibiehao:null,
      name:null,
      company:null,
      id:null,
      applyTime:null,
      applyCheckTime:null,
      lastUpdateTime:null,
      status:null,
    },
  },
  mutations: {
    SET_ROLEIDS: (state, roleIdsList) => {
      
      state.currentUser.roleIds = roleIdsList.join(',')
    },
    SET_USER: (state, user) => {
      
      state.currentUser = user
    },
    CLEAR_USER: (state) => {
      
      state.currentUser = null
    },
    RESET_USER: (state) => {
      
      state.currentUser = {
        identityNum:null,
        phoneValidated:null,
        createTime:null,
        phone:null,
        qiyeshibiehao:null,
        name:null,
        company:null,
        id:null,
        applyTime:null,
        applyCheckTime:null,
        lastUpdateTime:null,
        status:null,
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
