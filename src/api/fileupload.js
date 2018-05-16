import request from '@/utils/request'

export function picFile(data, params) {
  return request({
    url: '/upload/picFile',
    method: 'post',
    data:data,
    params:params
  })
}
