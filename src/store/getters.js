
const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  currentEditUser: state => state.usereditmanager.currentUser,
  message: state => state.currenteditmessage.message,
  userToken: state => state.user.userToken,
  userId: state => state.user.userId,
  permissions: state => state.user.pepodomIds,
  avatar: state => state.user.avatar,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  // errorLogs: state => state.errorLog.logs
}
export default getters
