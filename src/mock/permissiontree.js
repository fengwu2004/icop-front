import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const permissions = []
const count = 20

function createItem(treeId, parentId) {
  
  let item = Mock.mock({
    text: '@ctitle(3, 5)',
  })
  
  Object.assign(item, {treeId:treeId}, {parentId:parentId})
  
  return item
}

permissions.push(createItem(1, -1))
permissions.push(createItem(2, -1))
permissions.push(createItem(3, -1))

permissions.push(createItem(11, 1))
permissions.push(createItem(12, 1))
permissions.push(createItem(13, 1))

permissions.push(createItem(21, 2))
permissions.push(createItem(22, 2))
permissions.push(createItem(23, 2))

permissions.push(createItem(31, 3))
permissions.push(createItem(32, 3))

permissions.push(createItem(41, 11))
permissions.push(createItem(42, 11))

permissions.push(createItem(51, 12))
permissions.push(createItem(52, 12))

console.log('zz')

export default {
  
  queryRolePopedom: config => {
    
    console.log('zzz')
    
    return {
      data: {
        app:[], icop:[]
      },
    }
  }
}
