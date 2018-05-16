import request from '@/utils/request'

export function queryNoticeList(query) {
  return request({
    url: '/notice/queryNoticeList',
    method: 'post',
    params: query
  })
}

export function add(query) {
  return request({
    url: '/notice/add',
    method: 'post',
    params: query
  })
}

export function edit(query) {
  return request({
    url: '/notice/edit',
    method: 'post',
    params: query
  })
}

export function deleteNotice(query) {
  return request({
    url: '/notice/delete',
    method: 'post',
    params: query
  })
}

export function sendNotice(query) {
  return request({
    url: '/notice/sendNotice',
    method: 'post',
    params: query
  })
}



