const usereditmanager = {
  state: {
    currentUser: {
      personId:null,
      name:null,
      personCode:' ',
      userName:null,
      telephone:null,
      sex:'男',
      password:null,
    },
  },
  mutations: {
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
        sex:'男',
        password:null,
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

export default usereditmanager
