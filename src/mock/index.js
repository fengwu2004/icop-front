import Mock from 'mockjs'
import loginAPI from './login'
import permissiontree from './permissiontree'
import roleAPI from './role'
import userAPI from './user'
import projectAPI from './project'
import areamessageAPI from './areamessage'

Mock.setup({
  timeout: '350-600'
})

//角色相关
Mock.mock(/\/jslife-icop-oms\/role\/queryRoleList/, 'post', roleAPI.queryRoleList)
Mock.mock(/\/jslife-icop-oms\/role\/queryRoleInfo/, 'post', roleAPI.queryRoleInfo)
Mock.mock(/\/jslife-icop-oms\/popedom\/queryRolePopedom/, 'post', roleAPI.queryRolePopedom)
Mock.mock(/\/jslife-icop-oms\/role\/add/, 'post', roleAPI.add)
Mock.mock(/\/jslife-icop-oms\/role\/edit/, 'post', roleAPI.edit)
Mock.mock(/\/jslife-icop-oms\/role\/delete/, 'post', roleAPI.deleteRole)

//权限树相关
Mock.mock(/\/jslife-icop-oms\/user\/queryPopedomTree/, 'post', permissiontree.queryTotalRolePopedomTree)

// //用户相关
Mock.mock(/\/jslife-icop-oms\/user\/queryUserList/, 'post', userAPI.queryUserList)
Mock.mock(/\/jslife-icop-oms\/user\/userInfo/, 'post', userAPI.userInfo)
Mock.mock(/\/jslife-icop-oms\/user\/queryRoleListByIds/, 'post', userAPI.queryRoleListByIds)
Mock.mock(/\/jslife-icop-oms\/user\/edit/, 'post', userAPI.edit)
Mock.mock(/\/jslife-icop-oms\/user\/delete/, 'post', userAPI.deleteUser)
Mock.mock(/\/jslife-icop-oms\/user\/editPwd/, 'post', userAPI.editPwd)
Mock.mock(/\/jslife-icop-oms\/user\/add/, 'post', userAPI.add)
Mock.mock(/\/jslife-icop-oms\/user\/queryPersonList/, 'post', userAPI.queryPersonList)

//项目账户配置
Mock.mock(/\/jslife-icop-oms\/project\/queryProjectList/, 'post', projectAPI.queryProjectList)
Mock.mock(/\/jslife-icop-oms\/project\/add/, 'post', projectAPI.add)
Mock.mock(/\/jslife-icop-oms\/project\/editPwd/, 'post', projectAPI.editPwd)

// 登录相关
Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

//社区信息
Mock.mock(/\/jslife-icop-oms\/placard\/queryplacardList/, 'post', areamessageAPI.queryplacardList)
Mock.mock(/\/jslife-icop-oms\/placard\/add/, 'post', areamessageAPI.add)
Mock.mock(/\/jslife-icop-oms\/placard\/edit/, 'post', areamessageAPI.edit)
Mock.mock(/\/jslife-icop-oms\/placard\/deletePlacard/, 'post', areamessageAPI.deletePlacard)
Mock.mock(/\/jslife-icop-oms\/placard\/editPushStatus/, 'post', areamessageAPI.editPushStatus)


export default Mock
