import request from '@/utils/request'
import { appDomain } from '@/utils/set-request-address'

export function listObjects(bucket) {
  return request({
    url: `${appDomain}/api/buckets/listobjects`,
    method: 'get',
    params: {
      bucket
    }
  })
}

export function statObject(options) {
  return request({
    url: `${appDomain}/api/object/stat`,
    method: 'get',
    params: {
      bucket: options.bucket,
      object: options.object
    }
  })
}

export function downloadFile(options) {
  return request({
    url: `${appDomain}/api/object/url`,
    method: 'get',
    params: {
      bucket: options.bucket,
      object: options.object
    }
  })
}

export function removeObject(options) {
  return request({
    url: `${appDomain}/api/object/remove`,
    method: 'post',
    params: {
      bucket: options.bucket,
      object: options.object
    }
  })
}
