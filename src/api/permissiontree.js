import request from '@/utils/request'

export function queryTotalPopedomTree(query) {
  
  return request({
    url: '/user/queryPopedomTree',
    method: 'post',
    params: query
  })
}
