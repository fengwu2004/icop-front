const usereditmanager = {
  state: {
    currentUser: null,
  },
  mutations: {
    SET_USER: (state, user) => {
      
      state.currentUser = user
    },
    CLEAR_USER: (state) => {
      
      state.currentUser = null
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
        
        commit('CLEAR_USER', view)
        
        resolve()
      })
    },
  }
}

export default usereditmanager
