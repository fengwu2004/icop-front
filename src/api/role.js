import request from '@/utils/request'

export function queryRoleList(query) {
  return request({
    url: '/s/mgr/listManager',
    method: 'post',
    params: query
  })
}

export function queryPopedomListByIds(query) {
  return request({
    url: '/role/queryPopedomListByIds',
    method: 'post',
    params: query
  })
}

export function add(query) {
  return request({
    url: '/role/add',
    method: 'post',
    params: query
  })
}

export function edit(query) {
  return request({
    url: '/role/edit',
    method: 'post',
    params: query
  })
}

export function deleteRole(query) {
  return request({
    url: '/role/delete',
    method: 'post',
    params: query
  })
}

export function checkExistRoleName(query) {
  return request({
    url: '/role/checkExistRoleName',
    method: 'post',
    params: query
  })
}
