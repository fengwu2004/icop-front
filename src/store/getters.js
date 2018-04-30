
const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  currentEditUser: state => state.usereditmanager.currentUser,
  areamessage: state => state.currenteditmessage.areamessage,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  // errorLogs: state => state.errorLog.logs
}
export default getters
