<template>
  <div :class="{ 'has-logo': showLogo }">
    <Logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :collapse="isCollapse"
        :unique-opened="true"
        :default-active="activeMenu"
        background-color="#152d3d"
        text-color="#C0C4CC"
        active-text-color="#fff"
        mode="vertical"
      >
        <Item
          v-for="routeItem in routes"
          :key="routeItem.path"
          :item="routeItem"
          :base-path="routeItem.path"
          :is-collapse="isCollapse"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore, useSettingsStore, permissionStore } from '@/store'
import Item from './Item.vue'
import Logo from './Logo.vue'

const route = useRoute()
const appStore = useAppStore()
const useSettings = useSettingsStore()
const permission = permissionStore()

const routes = computed(() => permission.routes)

const activeMenu = computed(() => {
  const { meta, path } = route
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})

const showLogo = computed(() => useSettings.sidebarLogo)

const isCollapse = computed(() => !appStore.sidebar.opened)
</script>

<style lang="scss">
.sidebar-container {
  // 重置当前页面的 element-plus css, ，注意，虽然没有加 scoped 标识，但是被该页面的 sidebar-container 类名包裹，所以不会影响其他页面
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
  }
  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }
  .el-scrollbar__view {
    height: 100%;
  }
  .el-scrollbar__bar {
    &.is-vertical {
      right: 0;
    }
    &.is-horizontal {
      display: none;
    }
  }
}
</style>

<style lang="scss" scoped>
@mixin tip-line {
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background-color: #66b1ff;
  }
}

.el-scrollbar {
  height: 100%;
}

.has-logo {
  .el-scrollbar {
    // 84px 是 logo 区域的 height
    height: calc(100% - 84px);
  }
}

.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
}

::v-deep(.el-menu-item),
::v-deep(.el-sub-menu__title),
::v-deep(.el-sub-menu .el-menu-item) {
  height: 60px;
  line-height: 60px;
  &:hover {
    background-color: #ffffff10;
  }
  display: block;
  * {
    vertical-align: middle;
  }
  .el-tooltip__trigger {
    position: absolute;
    left: 0px;
    top: 0px;
    height: 100%;
    width: 100%;
    display: inline-block;
    box-sizing: border-box;
    padding: 0px 20px;
  }
}

::v-deep(.el-menu-item) {
  &.is-active {
    @include tip-line;
  }
}

.el-menu--collapse {
  ::v-deep(.el-sub-menu) {
    &.is-active {
      .el-sub-menu__title {
        color: #fff !important;
        @include tip-line;
      }
    }
  }
}
</style>
