/*eslint-disable*/
import { useAppStore } from '@/store'
import { onBeforeMount, onDeactivated, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const { body } = document
const WIDTH = 992

export default {
  setup() {
    const appStore = useAppStore()
    const route = useRoute()
    watch(
      () => route,
      () => {
        if (device === 'mobile' && appStore.sidebar.opened) {
          appStore.closeSideBar(false)
        }
      }
    )

    onBeforeMount(() => {
      window.addEventListener('resize', $_resizeHandler)
    })

    onMounted(() => {
      const isMobile = $_isMobile()
      if (isMobile) {
        appStore.toggleDevice('moblie')
        appStore.closeSideBar(true)
      }
    })

    onDeactivated(() => {
      window.removeEventListener('resize', $_resizeHandler)
    })

    const $_isMobile = () => {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    }

    const $_resizeHandler = () => {
      if (!document.hidden) {
        const isMobile = $_isMobile()
        const status = isMobile ? 'mobile' : 'desktop'
        appStore.toggleDevice(status)

        if (isMobile) {
          appStore.closeSideBar(true)
        }
      }
    }
  }
}
