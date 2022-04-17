import { defineStore } from 'pinia'
import { login, getUserInfo } from '@/api'
import { getToken, setToken } from '@/utils/auth'

export const userStore = defineStore('user', {
  state: () => {
    return {
      token: getToken(),
      access: ''
    }
  },
  actions: {
    login(userInfo) {
      const { access_key, secret_key } = userInfo
      return new Promise((resolve, reject) => {
        login({ access_key: access_key.trim(), secret_key })
          .then((res) => {
            if (res.status === 1) {
              const { data } = res

              this.token = data
              setToken(data)
              resolve()
            }
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    getUserInfo() {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then((res) => {
            if (res.status === 1) {
              const { data } = res

              if (!data) {
                reject('验证失败, 请重新登录')
              }

              this.access = data
              resolve(data)
            }
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    resetInfo() {
      this.token = ''
      this.access = ''
      setToken('')
    }
  }
})
