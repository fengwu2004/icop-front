import request from '@/utils/request'

export function login(account, pwd) {
  const data = {
    account,
    pwd
  }
  return request({
    url: '/s/login',
    method: 'get',
    params:data
  })
}

export function logout(params) {
  return request({
    url: '/s/logout',
    method: 'post',
    params:params
  })
}

export function validPic() {
  return request({
    url: '/validPic',
    method: 'post'
  })
}

export function editPwd(params) {
  return request({
    url: '/s/mgr/modifySelfPwd',
    method: 'post',
    params: params
  })
}

export function queryPopedomList(params) {
  return request({
    url: '/user/queryPopedomList',
    method: 'post',
    params: params
  })
}

