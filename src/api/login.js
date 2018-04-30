import request from '@/utils/request'

export function login(userName, password, Validate) {
  const data = {
    userName,
    password,
    Validate,
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

export function captcha() {
  return request({
    url: '/jslife-icop-oms/captcha',
    method: 'post'
  })
}

export function editPwd(token) {
  return request({
    url: '/jslife-icop-oms/user/editPwd',
    method: 'post',
    params: { token }
  })
}

