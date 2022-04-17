<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
        >
          {{ t('route.' + item.meta.title) }}
        </span>
        <a v-else @click.prevent="handleLink(item)">{{
          t('route.' + item.meta.title)
        }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { compile } from 'path-to-regexp'

let levelList = ref([])
const currenRoute = useRoute()
const router = useRouter()

const { t } = useI18n()

const isDashboard = (r) => {
  const name = r && r.name
  if (!name) {
    return false
  }

  return (
    name.trim().toLocaleLowerCase() === 'DashboardIndex'.toLocaleLowerCase()
  )
}

const getBreadcrumb = () => {
  let matched = currenRoute.matched.filter(
    (item) => item.meta && item.meta.title
  )

  const first = matched[0]

  if (!isDashboard(first)) {
    matched = [{ path: '/dashboard', meta: { title: 'dashboard' } }].concat(
      matched
    )
  }

  levelList.value = matched.filter(
    (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
  )
}

const pathCompile = (path) => {
  const { params } = currenRoute
  const toPath = compile(path)
  return toPath(params)
}

const handleLink = (item) => {
  const { redirect, path } = item
  if (redirect) {
    router.push(redirect).catch((err) => {
      console.warn(err)
    })
    return
  }
  router.push(pathCompile(path))
}

getBreadcrumb()

watch(
  () => currenRoute.path,
  (path) => {
    if (path.startsWith('/redirect/')) {
      return
    }
    getBreadcrumb()
  }
)
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
