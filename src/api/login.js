import request from '@/utils/request'

export function login(userName, password, validate) {
  const data = {
    userName,
    password,
    validate,
    isLogin:true
  }
  return request({
    url: '/jslife-icop-oms/login',
    method: 'post',
    params:data
  })
}

export function logout(params) {
  return request({
    url: '/jslife-icop-oms/logout',
    method: 'post',
    params:params
  })
}

export function validPic() {
  return request({
    url: '/jslife-icop-oms/validPic',
    method: 'post'
  })
}

export function editPwd(params) {
  return request({
    url: '/jslife-icop-oms/user/editPwd',
    method: 'post',
    params: params
  })
}

export function queryPopedomList(params) {
  return request({
    url: '/jslife-icop-oms/user/queryPopedomList',
    method: 'post',
    params: params
  })
}

