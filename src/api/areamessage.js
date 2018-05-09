import request from '@/utils/request'

export function queryAnnouncementList(query) {
  return request({
    url: '/jslife-icop-oms/announcement/queryAnnouncementList',
    method: 'post',
    params: query
  })
}

export function add(query) {
  return request({
    url: '/jslife-icop-oms/announcement/add',
    method: 'post',
    params: query
  })
}

export function edit(query) {
  return request({
    url: '/jslife-icop-oms/announcement/edit',
    method: 'post',
    params: query
  })
}

export function deleteAnnouncement(query) {
  return request({
    url: '/jslife-icop-oms/announcement/delete',
    method: 'post',
    params: query
  })
}

export function send(query) {
  return request({
    url: '/jslife-icop-oms/announcement/send',
    method: 'post',
    params: query
  })
}



