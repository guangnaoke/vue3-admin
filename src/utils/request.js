import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { userStore } from '@/store'
import errorMessage from './rep-error-code'
import { appDomain } from '@/utils/set-request-address'

const service = axios.create({
  baseURL: appDomain,
  timeout: 5000
})

service.interceptors.request.use(
  (config) => {
    const store = userStore()
    if (store.token) {
      /**
       * Request header to set token and permissions
       * 请求头设置token与权限
       */
      config.headers['Authorization'] = 'Bearer ' + store.token
      config.headers['x-role'] = store.access
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    const res = response.data
    const store = userStore()

    if (res.code === 401) {
      // Your identity is invalid and you need to log in again.
      ElMessageBox.alert('您的身份已过期，切换至登录页重新登入！', '注意', {
        confirmButtonText: '重新登录',
        callback: () => {
          store.restInfo()
          location.reload()
        }
      })

      return Promise.reject(new Error(response.message || 'Error'))
    } else {
      return res
    }
  },
  (error) => {
    error.message = errorMessage(error)
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
