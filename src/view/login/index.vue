<template>
  <section class="login">
    <Logo />

    <div class="login-container">
      <el-form
        ref="loginFormDom"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <div class="title-container">
          <h3 class="title">MinIO Client</h3>
        </div>

        <el-form-item prop="access_key">
          <el-input
            v-model="loginForm.access_key"
            :prefix-icon="User"
            placeholder="用户名"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="secret_key">
          <el-input
            v-model="loginForm.secret_key"
            :prefix-icon="Lock"
            placeholder="密码"
            type="password"
            show-password
            auto-complete="on"
            tabindex="2"
            @keyup.enter="handleLogin"
          />
        </el-form-item>

        <el-button
          :loading="loading"
          type="primary"
          style="width: 100%; margin-bottom: 30px"
          @click.prevent="handleLogin"
          >Login</el-button
        >
      </el-form>
    </div>
  </section>
</template>

<script setup>
import { validUsername } from '@/utils/validate'
import { reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { User, Lock } from '@element-plus/icons-vue'
import { userStore } from '@/store'
import Logo from './logo/index.vue'

const route = useRoute()
const router = useRouter()

const loginForm = reactive({
  access_key: 'staff_v1',
  secret_key: 'xxxxxxxx'
})

const loading = ref(false)
const redirect = ref(undefined)
const loginFormDom = ref()
const userStores = userStore()

const validateUsername = (rule, value, callback) => {
  if (!validUsername(value)) {
    callback(new Error('请输入正确的用户名'))
  } else {
    callback()
  }
}
const validatePassword = (rule, value, callback) => {
  if (value.length < 6) {
    callback(new Error('密码长度必须长于6位数'))
  } else {
    callback()
  }
}

const loginRules = reactive({
  access_key: [
    {
      required: true,
      trigger: 'blur',
      validator: validateUsername
    }
  ],
  secret_key: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword
    }
  ]
})

const handleLogin = () => {
  loginFormDom.value.validate((valid) => {
    if (valid) {
      loading.value = true
      userStores
        .login(loginForm)
        .then(() => {
          router.push({ path: redirect.value || '/' })
        })
        .catch(() => {
          loading.value = false
        })
    } else {
      loading.value = false
      return false
    }
  })
}

watch(
  () => route,
  function handle() {
    redirect.value = route.query && route.query.redirect
  },
  { immediate: true }
)
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

.login {
  display: flex;
  flex-direction: row;
  height: 100%;
}

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

.login-container {
  flex: 1;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 100%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 40px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #343a40;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 32% 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>
