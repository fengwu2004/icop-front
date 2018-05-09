import request from '@/utils/request'

export function queryProjectList(query) {
  return request({
    url: '/jslife-icop-oms/user/queryProjectList',
    method: 'post',
    params: query
  })
}

export function initProjectUser(query) {
  return request({
    url: '/jslife-icop-oms/user/initProjectUser',
    method: 'post',
    params: query
  })
}
