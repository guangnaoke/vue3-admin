import request from '@/utils/request'
import { appDomain } from '@/utils/set-request-address'

export function login(options) {
  return request({
    url: `${appDomain}/api/user/login`,
    method: 'post',
    data: {
      access_key: options.access_key,
      secret_key: options.secret_key
    }
  })
}

export function getUserInfo() {
  return request({
    url: `${appDomain}/api/user/info`,
    method: 'get'
  })
}
