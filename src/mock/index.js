import Mock from 'mockjs'
import loginAPI from './login'
import permissiontree from './permissiontree'
import roleAPI from './role'
import userAPI from './user'

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


// 登录相关
Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)


export default Mock
