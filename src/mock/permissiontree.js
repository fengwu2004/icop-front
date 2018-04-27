import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const roleList = []
const count = 148

for (let i = 0; i < count; i++) {
  roleList.push(Mock.mock({
    roleId: '@increment',
    roleName: '@cname',
    remark: '@region' + '@city' + '@county' + '@zip',
  }))
}

export default {
  queryRolePopedom: config => {
    
    const { roleIds } = param2Obj(config.url)
    
    return {
      data: [{
        popedomIds:'1111,2222,3333'
      }],
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
    
    const { importance, type, title, page = 1, limit = 20, sort } = param2Obj(config.url)
    
    let mockList = roleList
    
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    
    return {
      total: mockList.length,
      items: pageList
    }
  },
  edit: config => {
    
    const { importance, type, title, page = 1, limit = 20, sort } = param2Obj(config.url)
    
    let mockList = roleList
    
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    
    return {
      total: mockList.length,
      items: pageList
    }
  },
  deleteRole: config => {
    
    const { importance, type, title, page = 1, limit = 20, sort } = param2Obj(config.url)
    
    let mockList = roleList
    
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    
    return {
      total: mockList.length,
      items: pageList
    }
  },
}
