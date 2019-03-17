import Cookies from 'js-cookie'

const TokenKey = 'LoginSuccess'

export function getTokenAndId() {
  
  return {userToken:Cookies.get(TokenKey)}
}

export function checkValidTokenAndUserId() {
  
  let userToken = Cookies.get(TokenKey)
  
  return userToken === '1'
}

export function setTokenAndId() {

  Cookies.set(TokenKey, '1')
}

export function removeToken() {

  return Cookies.remove(TokenKey)
}
