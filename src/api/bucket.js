import request from '@/utils/request'
import { appDomain } from '@/utils/set-request-address'

export function bucketList() {
  return request({
    url: `${appDomain}/api/buckets/list`,
    method: 'get'
  })
}
