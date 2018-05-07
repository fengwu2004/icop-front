import request from '@/utils/request'

export function queryRoleList(query) {
  return request({
    url: '/jslife-icop-oms/role/queryRoleList',
    method: 'post',
    params: query
  })
}

export function queryPopedomListByIds(query) {
  return request({
    url: '/jslife-icop-oms/role/queryPopedomListByIds',
    method: 'post',
    params: query
  })
}

export function add(query) {
  return request({
    url: '/jslife-icop-oms/role/add',
    method: 'post',
    params: query
  })
}

export function edit(query) {
  return request({
    url: '/jslife-icop-oms/role/edit',
    method: 'post',
    params: query
  })
}

export function deleteRole(query) {
  return request({
    url: '/jslife-icop-oms/role/delete',
    method: 'post',
    params: query
  })
}
