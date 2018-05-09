import request from '@/utils/request'

export function queryUserList(query) {
  return request({
    url: '/jslife-icop-oms/user/queryUserList',
    method: 'post',
    params: query
  })
}

export function userInfo(query) {
  return request({
    url: '/jslife-icop-oms/user/userInfo',
    method: 'post',
    params: query
  })
}

export function queryPersonList(query) {
  return request({
    url: '/jslife-icop-oms/user/queryPersonList',
    method: 'post',
    params: query
  })
}

export function queryRoleListByIds(query) {
  return request({
    url: '/jslife-icop-oms/user/queryRoleListByIds',
    method: 'post',
    params: query
  })
}

export function add(query) {
  return request({
    url: '/jslife-icop-oms/user/add',
    method: 'post',
    params: query
  })
}

export function edit(query) {
  return request({
    url: '/jslife-icop-oms/user/edit',
    method: 'post',
    params: query
  })
}

export function deleteUser(query) {
  return request({
    url: '/jslife-icop-oms/user/delete',
    method: 'post',
    params: query
  })
}

export function editPwd(query) {
  return request({
    url: '/jslife-icop-oms/user/editPwd',
    method: 'post',
    params: query
  })
}

export function queryRoleList(query) {
  return request({
    url: '/jslife-icop-oms/user/queryRoleList',
    method: 'post',
    params: query
  })
}

export function checkExistUserName(query) {
  return request({
    url: '/jslife-icop-oms/user/checkExistUserName',
    method: 'post',
    params: query
  })
}


