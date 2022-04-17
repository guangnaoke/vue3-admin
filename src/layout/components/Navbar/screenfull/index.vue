<template>
  <div class="screenfull" @click="click">
    <el-tooltip effect="dark" content="全屏" placement="bottom">
      <el-icon :size="20">
        <full-screen />
      </el-icon>
    </el-tooltip>
  </div>
</template>

<script setup>
import { FullScreen } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import screenfull from 'screenfull'

/**
 * 如果使用jest测试时, 报screenfull export 导入错误,
 * 可以尝试在jest.config.js 里面 设置 transformIgnorePatterns: ['!node_modules/']
 */

const click = () => {
  if (!screenfull.isEnabled) {
    ElMessage.warning('浏览器无法正常工作')
    return
  }
  screenfull.toggle()
}
</script>
