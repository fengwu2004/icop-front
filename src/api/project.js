import request from '@/utils/request'

export function queryProjectList(query) {
  return request({
    url: '/jslife-icop-oms/project/queryProjectList',
    method: 'post',
    params: query
  })
}

export function add(query) {
  return request({
    url: '/jslife-icop-oms/project/add',
    method: 'post',
    params: query
  })
}

export function editPwd(query) {
  return request({
    url: '/jslife-icop-oms/project/editPwd',
    method: 'post',
    params: query
  })
}
