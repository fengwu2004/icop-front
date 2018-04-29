import request from '@/utils/request'

export function queryplacardList(query) {
  return request({
    url: '/jslife-icop-oms/placard/queryplacardList',
    method: 'post',
    params: query
  })
}

export function add(query) {
  return request({
    url: '/jslife-icop-oms/placard/add',
    method: 'post',
    params: query
  })
}

export function edit(query) {
  return request({
    url: '/jslife-icop-oms/placard/edit',
    method: 'post',
    params: query
  })
}

export function deletePlacard(query) {
  return request({
    url: '/jslife-icop-oms/placard/deletePlacard',
    method: 'post',
    params: query
  })
}

export function editPushStatus(query) {
  return request({
    url: '/jslife-icop-oms/placard/editPushStatus',
    method: 'post',
    params: query
  })
}



