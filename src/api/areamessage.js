import request from '@/utils/request'

export function queryAnnouncementList(query) {
  return request({
    url: '/announcement/queryAnnouncementList',
    method: 'post',
    params: query
  })
}

export function add(query) {
  return request({
    url: '/announcement/add',
    method: 'post',
    params: query
  })
}

export function edit(query) {
  return request({
    url: '/announcement/edit',
    method: 'post',
    params: query
  })
}

export function deleteAnnouncement(query) {
  return request({
    url: '/announcement/delete',
    method: 'post',
    params: query
  })
}

export function sendAnnouncement(query) {
  return request({
    url: '/announcement/sendAnnouncement',
    method: 'post',
    params: query
  })
}



