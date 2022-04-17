<template>
  <el-header class="navbar">
    <Hamburger
      :is-active="appStore.sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <Breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <Screenfull />

      <Language />

      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item> {{ t('settings.home') }} </el-dropdown-item>
            </router-link>
            <el-dropdown-item divided @click="logout">
              <span style="display: block">{{ t('settings.loginOut') }}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>
<script>
import { useI18n } from 'vue-i18n'
import { removeToken } from '@/utils/auth'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Hamburger from '@/components/Hamburger/index.vue'
import Screenfull from './screenfull/index.vue'
import Language from './language/index.vue'
import { useAppStore } from '@/store'
import { useRouter } from 'vue-router'
import avatar from '@images/avatar.jpg'

export default {
  name: 'NavbarIndex',
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    Language
  },
  setup() {
    const appStore = useAppStore()
    const router = useRouter()
    const { t } = useI18n()

    const toggleSideBar = () => {
      appStore.toggleSideBar()
    }

    const logout = () => {
      removeToken()
      router.push('/login')
    }

    return {
      appStore,
      toggleSideBar,
      logout,
      t,
      avatar
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    display: flex;
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .screenfull {
      margin-right: 20px;
      line-height: 3.5;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
