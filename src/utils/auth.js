import Cookies from 'js-cookie'

const TokenKey = 'JSLIFE-ICOP-OMS-Token'
const UserIdKey = 'JSLIFE-ICOP-OMS-UserIdKey'

export function getTokenAndUserId() {
  
  
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  
  return Cookies.remove(TokenKey)
}
