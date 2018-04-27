import Mock from 'mockjs'
import loginAPI from './login'
import permissiontree from './permissiontree'
import roleAPI from './role'

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
Mock.mock(/\/jslife-icop-oms\/user\/queryPopedomTree/, 'post', permissiontree.queryRolePopedom)

// //用户相关
// Mock.mock(/\/jslife-icop-oms\/user\/queryUserList/, 'post', roleAPI.queryRoleList)
// Mock.mock(/\/jslife-icop-oms\/role\/userInfo/, 'post', roleAPI.queryRoleInfo)
// Mock.mock(/\/jslife-icop-oms\/role\/queryPopedomTree/, 'post', roleAPI.add)
// Mock.mock(/\/jslife-icop-oms\/role\/edit/, 'post', roleAPI.edit)
// Mock.mock(/\/jslife-icop-oms\/role\/delete/, 'post', roleAPI.deleteRole)

// 登录相关
Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)


export default Mock
