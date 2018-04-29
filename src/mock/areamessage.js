import Mock from 'mockjs'
import { param2Obj } from '@/utils'
import permission from "@/store/modules/permission";

const messageList = []
const count = 15

for (let i = 0; i < count; i++) {
  
  let item = Mock.mock({
    id: '@increment',
    msgSubject: '@title(3, 6)',
    planPushTime: '@datetime',
    'type|1': ['SECURITY', 'PROPERTY', 'ELEVATOR', 'VOTE', 'COUPONS'],
    'pushChannel|1': ['APP', 'SMS'],
    'pushStatus|1': ['UNPUSH', 'NOPUSH', 'SUCCESS', 'FAIL'],
    'strategy|1': ['IMMEDIATELY ', 'TIMING'],
    name:'@cname',
  })
  
  messageList.push(item)
}

function removeMessage(roleId) {
  
  for (let i = 0; i < messageList.length; ++i) {
    
    if (parseInt(roleId) === messageList[i].roleId) {
  
      messageList.splice(i, 1)
      
      return
    }
  }
}

export default {
  queryplacardList: config => {
  
    const { pageIndex, pageSize } = param2Obj(config.url)
  
    let mockList = messageList.filter((item, index) => index < pageSize * pageIndex && index >= pageSize * (pageIndex - 1))
  
    const pageList = mockList
  
    let pageTotal = messageList.length / pageSize
  
    let totalCount = messageList.length
  
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
  deletePlacard: config => {
    
    const { roleId } = param2Obj(config.url)
    
    console.log('删除的roleId是' + roleId)
  
    removeRole(roleId)
    
    return {
    
    }
  },
  editPushStatus: config => {
    
    const { roleId } = param2Obj(config.url)
    
    console.log('删除的roleId是' + roleId)
    
    removeRole(roleId)
    
    return {
    
    }
  },
}
