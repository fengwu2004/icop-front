const currentrole = {
  state: {
    currentrole: {
      roleId:null,
      account:'',
      name:'',
      phone:'',
      pwd:''
    },
  },
  mutations: {
    SET_ROLE: (state, role) => {
      
      console.log('ok')
      
      state.currentrole = role
    },
    RESET_ROLE: (state) => {
      
      state.currentrole = {
        roleId:null,
        roleName:'',
        remark:'',
      }
    },
  },
  actions: {
    setCurrentRole({ commit }, role) {
      
      return new Promise(resolve => {
  
        commit('SET_ROLE', role)
  
        resolve()
      })
    },
    RESET_ROLE({ commit }) {
    
      return new Promise(resolve => {
      
        commit('RESET_ROLE')
      
        resolve()
      })
    },
  }
}

export default currentrole
