<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <Sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <Navbar />
      </div>
      <AppMain />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useAppStore } from '@/store'
import { AppMain, Navbar, Sidebar } from './components/index'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'LayoutIndex',
  mixins: [ResizeMixin],
  components: {
    Sidebar,
    Navbar,
    AppMain
  },
  setup() {
    const appStore = useAppStore()
    const { sidebar, device, fixedHeader } = appStore

    const classObj = computed(() => {
      return {
        hideSidebar: !sidebar.opened,
        openSidebar: sidebar.opened,
        withoutAnimation: sidebar.withoutAnimation,
        mobile: device === 'mobile'
      }
    })

    const handleClickOutside = () => {
      appStore.closeSideBar(false)
    }

    return {
      sidebar,
      device,
      fixedHeader,
      classObj,
      handleClickOutside
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@import '@/styles/variables.scss';
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
