const currentEditMessage = {
  state: {
    message: {
      messageId:null,
      msgSubject:null,
      summary:null,
      sendType:null,
      sendStrategy:null,
      planSendTime:null,
      imageUrl:null,
      msgContent:null,
      noticeType:null,
    },
  },
  mutations: {
    SET_MESSAGE: (state, message) => {
      
      console.log('ok')
      
      state.message = message
    },
    SET_MESSAGE_NOTICECONTENT:(state, msgContent) => {
      
      state.message.msgContent = msgContent
    },
    SET_MESSAGE_IMAGEURL:(state, imageUrl) => {
    
      state.message.imageUrl = imageUrl
    },
    RESET_MESSAGE: (state) => {
      
      state.message = {
        messageId:null,
        msgSubject:null,
        summary:null,
        sendType:null,
        sendStrategy:null,
        planSendTime:null,
        imageUrl:null,
        msgContent:null,
        noticeType:null,
      }
    },
  },
  actions: {
    setMessage({ commit }, message) {
      
      return new Promise(resolve => {
  
        commit('SET_MESSAGE', message)
  
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
    resetMessage({ commit, state }) {
    
      return new Promise((resolve) => {
      
        commit('RESET_MESSAGE')
      
        resolve()
      })
    },
  }
}

export default currentEditMessage
