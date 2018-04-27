import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 148

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    roleId: '@increment',
    roleName: '@cname',
    remark: '@region' + '@city' + '@county' + '@zip',
  }))
}

console.log(List)

export default {
  queryRoleList: config => {
    
    const { pageIndex, pageSize } = param2Obj(config.url)

    let mockList = List
    
    const pageList = mockList.filter((item, index) => index < pageSize * pageIndex && index >= pageSize * (pageIndex - 1))
    
    let pageTotal = List.length / pageSize
    
    let totalCount = List.length

    return {
      pageIndex:pageIndex,
      pageSize:pageSize,
      pageTotal:pageTotal,
      totalCount:totalCount,
      data: pageList,
    }
  },
  queryRoleInfo: config => {
    
    const { importance, type, title, page = 1, limit = 20, sort } = param2Obj(config.url)
    
    let mockList = List
    
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    
    return {
      total: mockList.length,
      items: pageList
    }
  },
  add: config => {
    
    const { importance, type, title, page = 1, limit = 20, sort } = param2Obj(config.url)
    
    let mockList = List
    
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    
    return {
      total: mockList.length,
      items: pageList
    }
  },
  edit: config => {
    
    const { importance, type, title, page = 1, limit = 20, sort } = param2Obj(config.url)
    
    let mockList = List
    
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    
    return {
      total: mockList.length,
      items: pageList
    }
  },
  deleteRole: config => {
    
    const { importance, type, title, page = 1, limit = 20, sort } = param2Obj(config.url)
    
    let mockList = List
    
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    
    return {
      total: mockList.length,
      items: pageList
    }
  },
}
