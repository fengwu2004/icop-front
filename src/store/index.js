import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import { permission } from "@/store/modules/permission";
import currentedituser from './modules/currentUser'
import currentEquip from './modules/currenteditmessage'
import currenteidtrole from './modules/currentRole'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    permission,
    user,
    currentedituser,
    currentEquip,
    currenteidtrole
  },
  getters
})

export default store
