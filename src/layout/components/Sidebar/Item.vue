<!-- 侧边栏 Item -->
<template>
  <div
    v-if="!item.meta || !item.hidden"
    :class="{ 'simple-mode': isCollapse, 'first-level': isFirstLevel }"
  >
    <template v-if="!showMenu && onlyOneChild && !onlyOneChild.children">
      <Link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)">
          <svg-icon
            v-if="onlyOneChild.meta.icon"
            :name="onlyOneChild.meta.icon"
            font-size="16px"
          />
          <template v-if="onlyOneChild.meta.title" #title>
            {{ t('route.' + onlyOneChild.meta.title) }}
          </template>
        </el-menu-item>
      </Link>
    </template>
    <el-sub-menu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <svg-icon
          v-if="item.meta && item.meta.icon"
          :name="item.meta.icon"
          font-size="16px"
        />
        <span v-if="item.meta && item.meta.title">{{
          t('route.' + item.meta.title)
        }}</span>
      </template>
      <template v-if="item.children">
        <Item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :is-collapse="isCollapse"
          :is-first-level="false"
          :base-path="resolvePath(child.path)"
        />
      </template>
    </el-sub-menu>
  </div>
</template>

<script setup>
import path from 'path'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { isExternal } from '@/utils/validate'
import Link from './Link.vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  isCollapse: {
    type: Boolean,
    required: false
  },
  isFirstLevel: {
    type: Boolean,
    default: true
  },
  basePath: {
    type: String,
    required: true
  }
})

const { t } = useI18n()

const showMenu = computed(() => {
  return !!(props.item.meta && props.item.meta.alwaysShow)
})

const showingChildren = computed(() => {
  if (props.item.children) {
    const showingChildren = props.item.children.filter((item) => {
      return !(item.meta && item.hidden)
    })
    return showingChildren.length
  }
  return 0
})

const onlyOneChild = computed(() => {
  if (showingChildren.value > 1) {
    return null
  }
  if (props.item.children) {
    for (const child of props.item.children) {
      if (!child.meta || !child.hidden) {
        return child
      }
    }
  }

  return { ...props.item, path: '' }
})

const resolvePath = (routePath) => {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(props.basePath)) {
    return props.basePath
  }
  return path.resolve(props.basePath, routePath)
}
</script>

<style lang="scss" scoped>
.svg-icon {
  margin-right: 20px;
}

.simple-mode {
  &.first-level {
    ::v-deep(.el-sub-menu) {
      .el-sub-menu__icon-arrow {
        display: none;
      }
      span {
        visibility: hidden;
      }
    }
  }
}
</style>
