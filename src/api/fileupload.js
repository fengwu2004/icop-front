import request from '@/utils/request'

export function picFile(query) {
  return request({
    url: '/upload/picFile',
    method: 'post',
    params: query
  })
}
