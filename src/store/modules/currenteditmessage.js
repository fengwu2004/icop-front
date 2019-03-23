const currentEditMessage = {
  state: {
    equip: {
      name:null,
      describe:null,
      category:'道闸',
      imageUrl:null
    },
  },
  mutations: {
    SET_EQUIP: (state, equip) => {
      
      state.equip = equip
    },
    SET_MESSAGE_NOTICECONTENT:(state, msgContent) => {
      
      state.message.msgContent = msgContent
    },
    SET_MESSAGE_IMAGEURL:(state, imageUrl) => {
    
      state.message.imageUrl = imageUrl
    },
    RESET_EQUIP: (state) => {
      
      state.equip = {
        name:null,
        describe:null,
        category:'道闸',
        imageUrl:null
      }
    },
  },
  actions: {
    setEquip({ commit }, equip) {
      
      return new Promise(resolve => {
  
        commit('SET_EQUIP', equip)
  
        resolve()
      })
    },
    setMessageContent({ commit }, msgContent) {
  
      return new Promise(resolve => {
    
        commit('SET_MESSAGE_NOTICECONTENT', msgContent)
    
        resolve()
      })
    },
    setMessageImageUrl({ commit }, imageUrl) {
    
      return new Promise(resolve => {
      
        commit('SET_MESSAGE_IMAGEURL', imageUrl)
      
        resolve()
      })
    },
    resetEquip({ commit, state }) {
    
      return new Promise((resolve) => {
      
        commit('RESET_EQUIP')
      
        resolve()
      })
    },
  }
}

export default currentEditMessage
