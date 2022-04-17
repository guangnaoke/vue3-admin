<template>
  <div class="language">
    <el-dropdown>
      <svg-icon name="language" font-size="22px" />

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="item in languages"
            :key="item.value"
            :disabled="language === item.value"
          >
            <span @click="handleSetLanguage(item.value)">{{ item.name }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import { setLocalLanguage } from '@/utils/auth'
import { useSettingsStore } from '@/store'
import { computed, defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  props: {
    isWhite: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const { locale } = useI18n()
    const settings = useSettingsStore()

    const languages = [
      { name: 'en', value: 'en' },
      { name: '中文', value: 'zh-CN' }
    ]

    const handleSetLanguage = (lang) => {
      locale.value = lang
      settings.localLanguage = lang
      setLocalLanguage(lang)
    }
    const language = computed(() => {
      return settings.localLanguage
    })

    return {
      languages,
      handleSetLanguage,
      language
    }
  }
})
</script>

<style lang="scss" scoped>
.language {
  margin-right: 20px;
  .el-dropdown {
    vertical-align: sub;
  }
}
</style>
