import Mock from 'mockjs'
import { param2Obj } from '@/utils'
import permission from "@/store/modules/permission";

const projectList = []
const count = 148

for (let i = 0; i < count; i++) {
  
  let item = Mock.mock({
    projectId: '@increment',
    projectCode:'@integer(1, 300)',
    projectName: '@cname',
    userName: '@email',
    userId: '@integer(1000, 50000)',
  })
  
  if (Math.random() < 0.5) {
  
    item.userName = null
  }
  
  projectList.push(item)
}

export default {
  queryProjectList: config => {
    
    const { pageIndex, pageSize, queryParam } = param2Obj(config.url)
    
    let totalList = projectList
    
    if (queryParam) {
  
      let list = projectList.filter((item, index) => item.projectCode === queryParam)
      
      if (list && list.length > 0) {
        
        totalList = list
      }
      else {
  
        totalList = projectList.filter((item, index) => item.projectName.indexOf(queryParam) !== -1)
      }
    }
    
    let pageList = totalList.filter((item, index) => index < pageSize * pageIndex && index >= pageSize * (pageIndex - 1))
    
    let pageTotal = totalList.length / pageSize
    
    let totalCount = totalList.length
    
    return {
      pageIndex:pageIndex,
      pageSize:pageSize,
      pageTotal:pageTotal,
      totalCount:totalCount,
      list: pageList,
    }
  },
  add: config => {
    
    console.log('zz')
    
    const { ProjectCode } = param2Obj(config.url)
    
    console.log(ProjectCode)
    
    return {
    
    }
  },
  editPwd: config => {
    
    const { userId } = param2Obj(config.url)
    
    console.log(userId)
    
    return {
    
    }
  },
}
