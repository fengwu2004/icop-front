/* 小写字母*/
export function validateLowerCase(str) {
  
  const reg = /^[a-z]+$/
  
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  
  const reg = /^[A-Z]+$/
  
  return reg.test(str)
}

/* 大小写字母*/
export function validateAlphabets(str) {
  
  const reg = /^[A-Za-z]+$/
  
  return reg.test(str)
}

/*数字，字母，下划线，不以下划线开头结尾, 长度1-30*/
export function validateUserName(str) {
  
  const reg =  /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]{1,30}$/
  
  return reg.test(str)
}

export function trim(str){
  
  return str.replace(/(^\s*)|(\s*$)/g, "")
}

export function validatePassword(str) {
  
  const reg = /^(?!_)(?!.*?_$)[a-zA-Z0-9_]{6,16}$/
  
  return reg.test(str)
}

export function validateRoleName(str) {
  
  const reg = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]{1,15}$/
  
  return reg.test(str)
}

export function validateMsgSubject(str) {
  
  const reg = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]{1,30}$/
  
  return reg.test(str)
}

export function validateMsgSummary(str) {
  
  let trimstr = trim(str)
  
  const reg = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]{1,60}$/
  
  return reg.test(trimstr)
}

export function isValidPersonCode(str) {
  
  const reg = /^(?!_)(?!.*?_$)[a-zA-Z0-9]{1,30}$/
  
  return reg.test(str)
}

export function isValidPhoneNumber(str) {
  
  const reg = /^(?!_)(?!.*?_$)[0-9,]{1,30}$/
  
  return reg.test(str)
}
