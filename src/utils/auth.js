import Cookies from 'js-cookie'

const TokenKey = 'JSLIFE-ICOP-OMS-Token'
const UserIdKey = 'JSLIFE-ICOP-OMS-UserIdKey'

export function getTokenAndId() {
  
  return {loginUserId:Cookies.get(UserIdKey), userToken:Cookies.get(TokenKey)}
}

export function checkValidTokenAndUserId() {
  
  let {loginUserId, userToken } = getTokenAndId()
  
  return loginUserId && userToken
}

export function setTokenAndId(token, userId) {
  
  return Cookies.set(TokenKey, token) && Cookies.set(UserIdKey, userId)
}

export function removeToken() {
  
  return Cookies.remove(TokenKey) && Cookies.remove(UserIdKey)
}
