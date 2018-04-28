import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const userList = []
const count = 148

let apppermission = [
  '300000,301100,301200,301300,301400,301500,301600,301700,301710,301720,301730,301740,301750,301760,301770,301780',
  '301100,301200,301400,301500,301600,301700,301710,301720,301730,301740,301750,301760,301770,301780',
  '301100,301200,301400,301500,301600',
'301100,301200,301400,301500,301600,301760',
'301100,301200,301400,301500,301600,301760,310000,311100']

let icoppermission = ['', '100000,101000,101100']

for (let i = 0; i < count; i++) {
  
  let item = Mock.mock({
    userId:'@increment',
    userName: '@email',
    personCode:'@integer(1, 300)',
    name: '@cname',
  })
  
  if (Math.random() % 2 === 0) {
  
    item.sex = "男"
    
    item.telephone = '18910000000'
  }
  else {
  
    item.sex = "女"
  
    item.telephone = '18910003450'
  }
  
  userList.push(item)
}

// console.log(userList)

function removeUser(roleId) {
  
  for (let i = 0; i < userList.length; ++i) {
    
    if (parseInt(roleId) === userList[i].roleId) {
  
      userList.splice(i, 1)
      
      return
    }
  }
}

export default {
  queryUserList: config => {
    
    const { pageIndex, pageSize } = param2Obj(config.url)

    let mockList = userList.filter((item, index) => index < pageSize * pageIndex && index >= pageSize * (pageIndex - 1))
    
    const pageList = mockList
    
    let pageTotal = userList.length / pageSize
    
    let totalCount = userList.length

    return {
      pageIndex:pageIndex,
      pageSize:pageSize,
      pageTotal:pageTotal,
      totalCount:totalCount,
      data: pageList,
    }
  },
  userInfo: config => {
    
    console.log('queryRoleInfo')
    
    const { roleName } = param2Obj(config.url)
    
    let mockList = userList.filter((item, index) => item.roleName.indexOf(roleName) !== -1)
  
    let pageIndex = 1
  
    let pageSize = 20
    
    const pageList = mockList.filter((item, index) => index < pageSize * pageIndex && index >= pageSize * (pageIndex - 1))
    
    let pageTotal = mockList.length / pageSize
    
    let totalCount = mockList.length
    
    return {
      pageIndex:pageIndex,
      pageSize:pageSize,
      pageTotal:pageTotal,
      totalCount:totalCount,
      data: pageList,
    }
  },
  queryRoleListByIds: config => {
    
    let role0 = {
      roleId:10,
      roleName:'收费员',
      remark:'收费员使用',
    }
  
    let role1 = {
      roleId:11,
      roleName:'管理员',
      remark:'管理员使用',
    }
  
    let role2 = {
      roleId:12,
      roleName:'保洁',
      remark:'保洁使用',
    }
    
    const pageList = [role0, role1, role2]
    
    return {
      data: pageList,
    }
  },
  queryPersonList: config => {
    
    const { pageIndex, pageSize } = param2Obj(config.url)
    
    let mockList = userList.filter((item, index) => index < pageSize * pageIndex && index >= pageSize * (pageIndex - 1))
    
    const pageList = mockList
    
    let pageTotal = userList.length / pageSize
    
    let totalCount = userList.length
    
    return {
      pageIndex:pageIndex,
      pageSize:pageSize,
      pageTotal:pageTotal,
      totalCount:totalCount,
      data: pageList,
    }
  },
  edit: config => {
    
    console.log('zz')
    
    const { roleName, remark, popedomIds } = param2Obj(config.url)
    
    console.log(roleName, remark, popedomIds)
    
    return {
    
    }
  },
  deleteUser: config => {
    
    const { roleId } = param2Obj(config.url)
    
    console.log('删除的roleId是' + roleId)
    
    removeRole(roleId)
    
    return {
    
    }
  },
  editPwd: config => {
    
    const { roleId } = param2Obj(config.url)
    
    console.log('删除的roleId是' + roleId)
    
    removeRole(roleId)
    
    return {
    
    }
  },
  add: config => {
    
    const { roleName, remark, popedomIds } = param2Obj(config.url)
    
    console.log(popedomIds)
    
    return {
    
    }
  },
}
