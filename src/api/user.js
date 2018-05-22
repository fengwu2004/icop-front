import request from '@/utils/request'

export function queryUserList(query) {
  return request({
    url: '/user/queryUserList',
    method: 'post',
    params: query
  })
}

export function queryPersonList(query) {
  return request({
    url: '/user/queryPersonList',
    method: 'post',
    params: query
  })
}

export function queryRoleListByIds(query) {
  return request({
    url: '/user/queryRoleListByIds',
    method: 'post',
    params: query
  })
}

export function add(query) {
  return request({
    url: '/user/add',
    method: 'post',
    params: query
  })
}

export function edit(query) {
  return request({
    url: '/user/edit',
    method: 'post',
    params: query
  })
}

export function deleteUser(query) {
  return request({
    url: '/user/delete',
    method: 'post',
    params: query
  })
}

export function editPwd(query) {
  return request({
    url: '/user/editPwd',
    method: 'post',
    params: query
  })
}

export function queryRoleList(query) {
  return request({
    url: '/user/queryRoleList',
    method: 'post',
    params: query
  })
}

export function checkExistUserName(query) {
  return request({
    url: '/user/checkExistUserName',
    method: 'post',
    params: query
  })
}

