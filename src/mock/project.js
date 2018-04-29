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
  })
  
  if (Math.random() < 0.5) {
  
    item.userName = null
  }
  
  projectList.push(item)
}

export default {
  queryProjectList: config => {
    
    const { pageIndex, pageSize } = param2Obj(config.url)
    
    let mockList = projectList.filter((item, index) => index < pageSize * pageIndex && index >= pageSize * (pageIndex - 1))
    
    const pageList = mockList
    
    let pageTotal = projectList.length / pageSize
    
    let totalCount = projectList.length
    
    return {
      pageIndex:pageIndex,
      pageSize:pageSize,
      pageTotal:pageTotal,
      totalCount:totalCount,
      data: pageList,
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
    
    const { userID } = param2Obj(config.url)
    
    console.log(userID)
    
    return {
    
    }
  },
}
