import router from './router'
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Base64 } from 'js-base64'
import { getToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'
import { userStore, permissionStore } from '@/store'

// NProgress Configuration
NProgress.configure({ showSpinner: false })

// no redirect whitelist
const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const store = userStore()

      if (store.access) {
        next()
      } else {
        try {
          const permission = await permissionStore()
          /**
           * 如果token与身份信息同时通过Login传过来了, 下面这个方法就不必要了.
           * 注意做好access的值就好, 将access存到本地, 在generateRoutes里面赋值.
           * 这样access有值的情况下是不会走到这里的, 如果用户刷新就丢失了access, 就会重新走一遍这里
           */
          const data = await store.getUserInfo()

          const accessRoutes = await permission.generateRoutes([
            Base64.decode(data)
          ])

          await accessRoutes.forEach((item) => {
            router.addRoute(item)
          })

          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.resetInfo()
          ElMessage.error(error || 'Has Error')
          next(`/login`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.

      next(`/login`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
