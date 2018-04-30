const currentEditMessage = {
  state: {
    areamessage: {
      msgSubject:null,
      summary:null,
      type:null,
      pushChannel:null,
      strategy:null,
      planPushTime:null,
      imgUrl:null,
      msgContent:null,
      recipient:null,
    },
  },
  mutations: {
    SET_AREA_MESSAGE: (state, message) => {
      
      console.log('ok')
      
      state.areamessage = message
    },
    RESET_AREA_MESSAGE: (state) => {
      
      state.areamessage = {
        msgSubject:null,
        summary:null,
        type:null,
        pushChannel:null,
        strategy:null,
        planPushTime:null,
        imgUrl:null,
        msgContent:null,
        recipient:null,
      }
    },
  },
  actions: {
    setAreaMessage({ commit }, message) {
      
      return new Promise(resolve => {
  
        commit('SET_AREA_MESSAGE', message)
  
        resolve()
      })
    },
    resetAreaMessage({ commit, state }) {
    
      return new Promise((resolve) => {
      
        commit('RESET_AREA_MESSAGE')
      
        resolve()
      })
    },
  }
}

export default currentEditMessage
