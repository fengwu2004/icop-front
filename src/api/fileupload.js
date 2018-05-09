import request from '@/utils/request'

export function picFile(data, params) {
  return request({
    url: '/jslife-file-service/upload/picFile',
    method: 'post',
    data:data,
    params:params
  })
}
