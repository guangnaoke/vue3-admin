export default [
  {
    url: '/api/dashboard',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
          info: [
            {
              title: 'Bucket',
              style: 'bucket',
              icon: 'bucket',
              num: 2,
              stat: true
            },
            {
              title: 'Object',
              style: 'object',
              icon: 'file',
              num: 9,
              stat: true
            },
            {
              title: 'Servers',
              style: 'servers',
              icon: 'server',
              online: 1,
              offline: 0,
              stat: false
            },
            {
              title: 'Drives',
              style: 'drives',
              icon: 'drives',
              online: 1,
              offline: 0,
              stat: false
            }
          ],
          servers: [
            { title: 'Drives', icon: 'drives', content: '1/1' },
            { title: 'Network', icon: 'network', content: '1/1' },
            { title: 'Up Time', icon: 'time', content: '2 Weeks' },
            { title: 'Version', icon: 'minio', content: '2020-22-24 22:12:02' }
          ]
        },
        message: '获取首页信息成功',
        status: 1
      }
    }
  },
  {
    url: '/api/user/login',
    method: 'post',
    response: () => {
      return {
        code: 200,
        data: 'token',
        message: '登陆成功',
        status: 1
      }
    }
  },
  {
    url: '/api/user/info',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: 'cmVhZHdyaXRl',
        message: '成功获取身份信息',
        status: 1
      }
    }
  },
  {
    url: '/api/buckets/list',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: [
          { name: 'files', creationDate: '2022-02-25T18:51:45.041Z' },
          { name: 'test', creationDate: '2022-02-25T09:50:10.273Z' }
        ],
        message: '获取列表成功',
        status: 1
      }
    }
  },
  {
    url: '/api/buckets/listobjects',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: [
          {
            name: '1620977796414.jpg',
            size: 46975,
            last_modified: '2022-04-08 14:48:19'
          },
          {
            name: 'Desktop Copy.png',
            size: 2139447,
            last_modified: '2022-03-16 06:32:34'
          },
          {
            name: 'v2-9326f643a5044c369681589d77fc9d72_b.jpeg',
            size: 122305,
            last_modified: '2022-03-16 06:34:10'
          }
        ],
        message: '查询成功',
        status: 1
      }
    }
  }
]
