import request from '@/utils/request'

export function login(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/jslife-icop-oms/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/jslife-icop-oms/logout',
    method: 'post'
  })
}

export function editPwd(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

