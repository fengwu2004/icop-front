import Mock from 'mockjs'
import { param2Obj } from '@/utils'
import permission from "@/store/modules/permission";

const messageList = []
const count = 15

for (let i = 0; i < count; i++) {
  
  let item = Mock.mock({
    id: '@increment',
    msgSubject: '@ctitle(4, 10)',
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
  queryAnnouncementList: config => {
  
    const { pageIndex, pageSize, msgSubject } = param2Obj(config.url)
  
    let totalList = messageList
  
    if (msgSubject) {
    
      totalList = messageList.filter((item, index) => item.msgSubject.indexOf(msgSubject) !== -1)
    }
  
    const pageList = totalList.filter((item, index) => index < pageSize * pageIndex && index >= pageSize * (pageIndex - 1))
  
    let pageTotal = Math.ceil(totalList.length / pageSize)
  
    let totalCount = totalList.length
    
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
  deleteAnnouncement: config => {
    
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
