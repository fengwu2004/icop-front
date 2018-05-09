import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import permission from './modules/permission'
import currentedituser from './modules/currentUser'
import currenteditmessage from './modules/currenteditmessage'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    permission,
    user,
    currentedituser,
    currenteditmessage
  },
  getters
})

export default store
