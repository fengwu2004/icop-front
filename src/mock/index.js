import Mock from 'mockjs'
import loginAPI from './login'
import permissiontree from './permissiontree'
import roleAPI from './role'
import userAPI from './user'
import projectAPI from './project'
import areamessageAPI from './areamessage'
import uploadAPI from './upload'

Mock.setup({
  timeout: '350-600'
})

let mock_role = false
let mock_user = false
let mock_project = false
let mock_message_area = false

//角色相关

if (mock_role) {
  
  Mock.mock(/\/jslife-icop-oms\/role\/queryRoleList/, 'post', roleAPI.queryRoleList)
  Mock.mock(/\/jslife-icop-oms\/role\/queryPopedomListByIds/, 'post', roleAPI.queryPopedomListByIds)
  Mock.mock(/\/jslife-icop-oms\/role\/add/, 'post', roleAPI.add)
  Mock.mock(/\/jslife-icop-oms\/role\/edit/, 'post', roleAPI.edit)
  Mock.mock(/\/jslife-icop-oms\/role\/delete/, 'post', roleAPI.deleteRole)
}

//用户相关
if (mock_user) {
  
  Mock.mock(/\/jslife-icop-oms\/user\/queryPopedomTree/, 'post', permissiontree.queryTotalRolePopedomTree)
  Mock.mock(/\/jslife-icop-oms\/user\/queryUserList/, 'post', userAPI.queryUserList)
  Mock.mock(/\/jslife-icop-oms\/user\/userInfo/, 'post', userAPI.userInfo)
  Mock.mock(/\/jslife-icop-oms\/user\/edit/, 'post', userAPI.edit)
  Mock.mock(/\/jslife-icop-oms\/user\/delete/, 'post', userAPI.deleteUser)
  Mock.mock(/\/jslife-icop-oms\/user\/editPwd/, 'post', userAPI.editPwd)
  Mock.mock(/\/jslife-icop-oms\/user\/add/, 'post', userAPI.add)
  Mock.mock(/\/jslife-icop-oms\/user\/queryPersonList/, 'post', userAPI.queryPersonList)
  Mock.mock(/\/jslife-icop-oms\/user\/queryRoleListByIds/, 'post', userAPI.queryRoleListByIds)
}

//项目账户配置
if (mock_project) {
  
  Mock.mock(/\/jslife-icop-oms\/project\/queryProjectList/, 'post', projectAPI.queryProjectList)
  Mock.mock(/\/jslife-icop-oms\/project\/add/, 'post', projectAPI.add)
  Mock.mock(/\/jslife-icop-oms\/project\/editPwd/, 'post', projectAPI.editPwd)
}

//社区信息
if (mock_message_area) {
  
  Mock.mock(/\/jslife-icop-oms\/announcement\/queryAnnouncementList/, 'post', areamessageAPI.queryAnnouncementList)
  Mock.mock(/\/jslife-icop-oms\/announcement\/add/, 'post', areamessageAPI.add)
  Mock.mock(/\/jslife-icop-oms\/announcement\/edit/, 'post', areamessageAPI.edit)
  Mock.mock(/\/jslife-icop-oms\/announcement\/delete/, 'post', areamessageAPI.deleteAnnouncement)
  Mock.mock(/\/jslife-icop-oms\/announcement\/editPushStatus/, 'post', areamessageAPI.editPushStatus)
}

// 登录相关
Mock.mock(/\/jslife-icop-oms\/captcha/, 'post', loginAPI.captcha)
Mock.mock(/\/jslife-icop-oms\/login/, 'post', loginAPI.login)
Mock.mock(/\/jslife-icop-oms\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/jslife-icop-oms\/user\/editPwd/, 'post', loginAPI.editPwd)



export default Mock
