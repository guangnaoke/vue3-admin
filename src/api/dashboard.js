import request from '@/utils/request'

export function getDashboardInfo() {
  return request({
    url: '/api/dashboard',
    method: 'get'
  })
}
