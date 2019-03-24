import request from '@/utils/request'

export function listEquip(query) {
  return request({
    url: '/s/equip/listEquip',
    method: 'post',
    params: query
  })
}

export function listEquipRepair(query) {
  return request({
    url: '/s/repair/listEquipRepair',
    method: 'post',
    params: query
  })
}

export function getEquipInfoById(query) {
  return request({
    url: '/equip/getEquipInfoById',
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



