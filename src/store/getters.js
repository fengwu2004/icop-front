import currenteidtrole from "@/store/modules/currentRole";

const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  currentEditUser: state => state.currentedituser.currentUser,
  currentEditRole: state => state.currenteidtrole.currentrole,
  message: state => state.currenteditmessage.message,
  userId: state => state.user.userId,
  routes: state => state.user.routes,
  avatar: state => state.user.avatar,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  permissioncodes: state => state.permission.validCodes,
  appicopvalid: state => state.permission.appicopvalid,
  appfunctions: state => state.permission.appfunctions,
  icopfunctions: state => state.permission.icopfunctions,
  // errorLogs: state => state.errorLog.logs
}
export default getters
