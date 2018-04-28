import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const roleList = []
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
    roleId: '@increment',
    roleName: '@cname',
    remark: '@region' + '@city' + '@county' + '@zip',
  })
  
  roleList.push(item)
}

function removeRole(roleId) {
  
  for (let i = 0; i < roleList.length; ++i) {
    
    if (parseInt(roleId) === roleList[i].roleId) {
      
      roleList.splice(i, 1)
      
      return
    }
  }
}

export default {
  queryRolePopedom: config => {
    
    const { roleIds } = param2Obj(config.url)
    
    console.log(roleIds)
    
    return {
      popedomIds:'301100,301200,301400,301500,301600,301760,310000,311100,100000,101000,101100',
    }
  },
  queryRoleList: config => {
    
    const { pageIndex, pageSize } = param2Obj(config.url)

    let mockList = roleList.filter((item, index) => index < pageSize * pageIndex && index >= pageSize * (pageIndex - 1))
    
    const pageList = mockList
    
    let pageTotal = roleList.length / pageSize
    
    let totalCount = roleList.length

    return {
      pageIndex:pageIndex,
      pageSize:pageSize,
      pageTotal:pageTotal,
      totalCount:totalCount,
      data: pageList,
    }
  },
  queryRoleInfo: config => {
    
    console.log('queryRoleInfo')
    
    const { roleName } = param2Obj(config.url)
    
    let mockList = roleList.filter((item, index) => item.roleName.indexOf(roleName) !== -1)
  
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
  add: config => {
    
    const { roleName, remark, popedomIds } = param2Obj(config.url)
    
    console.log(popedomIds)
    
    return {
    
    }
  },
  edit: config => {
  
    console.log('zz')
    
    const { roleName, remark, popedomIds } = param2Obj(config.url)
  
    console.log(roleName, remark, popedomIds)
  
    return {
    
    }
  },
  deleteRole: config => {
    
    const { roleId } = param2Obj(config.url)
    
    console.log('删除的roleId是' + roleId)
  
    removeRole(roleId)
    
    return {
    
    }
  },
}
