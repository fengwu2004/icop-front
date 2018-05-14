
const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  currentEditUser: state => state.currentedituser.currentUser,
  message: state => state.currenteditmessage.message,
  userToken: state => state.user.userToken,
  userId: state => state.user.userId,
  routes: state => state.user.routes,
  avatar: state => state.user.avatar,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  permissioncodes: state => state.permission.validCodes,
  // errorLogs: state => state.errorLog.logs
}
export default getters
