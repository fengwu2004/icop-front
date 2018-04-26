import Mock from 'mockjs'

const List = []

for (let i = 0; i < 25; ++i) {
  
  List.push(Mock.mock({
    index: '@increment',
    name: '@cname',
    address: '@region' + '@city' + '@county' + '@zip',
  }))
}

// console.log(List)

export { List as default }
