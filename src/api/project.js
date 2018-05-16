import request from '@/utils/request'

export function queryProjectList(query) {
  return request({
    url: '/user/queryProjectList',
    method: 'post',
    params: query
  })
}

export function initProjectUser(query) {
  return request({
    url: '/user/initProjectUser',
    method: 'post',
    params: query
  })
}
