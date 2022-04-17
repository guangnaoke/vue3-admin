import { createApp } from 'vue'
import { createPinia } from 'pinia'
import i18n from '../locale/index'
import App from './App.vue'
import router from './router'

/* element 全局样式
  import 'element-plus/dist/index.css'
*/

import 'element-plus/theme-chalk/src/message.scss'
import 'element-plus/theme-chalk/src/message-box.scss'
import 'element-plus/theme-chalk/src/overlay.scss'
import '@/styles/index.scss'
import 'virtual:svg-icons-register'

import '@/permission'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia).use(router).use(i18n)
app.mount('#app')
