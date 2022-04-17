<template>
  <el-main class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <component :is="Component" :key="key" />
      </transition>
    </router-view>
  </el-main>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useRoute } from 'vue-router'

export default {
  name: 'AppMainIndex',
  setup() {
    const route = useRoute()
    const key = computed(
      () => route.path,
      () => {
        return route.path
      }
    )
    return {
      key
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
