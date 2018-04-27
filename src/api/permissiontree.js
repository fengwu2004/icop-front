import request from '@/utils/request'

export function queryPopedomTree(query) {
  return request({
    url: '/jslife-icop-oms/user/queryPopedomTree',
    method: 'post',
    params: query
  })
}
