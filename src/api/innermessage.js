import request from '@/utils/request'

export function queryNoticeList(query) {
  return request({
    url: '/jslife-icop-oms/notice/queryNoticeList',
    method: 'post',
    params: query
  })
}

export function add(query) {
  return request({
    url: '/jslife-icop-oms/notice/add',
    method: 'post',
    params: query
  })
}

export function edit(query) {
  return request({
    url: '/jslife-icop-oms/notice/edit',
    method: 'post',
    params: query
  })
}

export function deleteNotice(query) {
  return request({
    url: '/jslife-icop-oms/notice/delete',
    method: 'post',
    params: query
  })
}

export function sendNotice(query) {
  return request({
    url: '/jslife-icop-oms/notice/sendNotice',
    method: 'post',
    params: query
  })
}



